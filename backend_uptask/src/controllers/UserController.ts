import User from "../models/User";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import emailConfirmUser from "../emails/EmailConfirmUser";
import {EmailConfirmEmpresa, EmailConfirmUser, EmailResetPassword, GenerateJWT} from "../types";
import {email_reset_password} from "../emails/EmailResetPassword";
import {generateJWT} from "../helpers/helpers";
import {Empresa} from "../models/Empresa";
import {email_confirm_empresa} from "../emails/EmailConfirmEmpresa";

const prueba = (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Funcionando controlador de usuarios con ruta protegida"
    });
}

const create_user = async (req, res) => {
    try {
        const {nombre, apellidos, email, password, empresa, rol} = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const token = uuidv4();
        const user_to_create = await User.create({
            nombre,
            apellidos,
            email,
            token,
            password: password_hash,
            empresa,
            rol
        });

        const empresa_to_notificate = await Empresa.findById(empresa);

        const DataEmailConfirmUser: EmailConfirmUser = {
            email,
            nombre,
            subject: "Confirma tu Cuenta en UpTask",
            token
        }

        const DataEmailConfirmEmpresa: EmailConfirmEmpresa = {
            email_usuario: email,
            subject: "Confirma a tu Colaborador en UpTask",
            email_empresa: empresa_to_notificate.email,
            nombre_empresa: empresa_to_notificate.nombre,
            id_ususario: user_to_create.id
        }
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await emailConfirmUser(DataEmailConfirmUser);
        await sleep(10000);
        await email_confirm_empresa(DataEmailConfirmEmpresa);

        return res.status(201).json({
            status: true,
            message: "Usuario creado correctamente. Confirma tu cuenta en tu email",
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            messsage: "Ocurrio un error en la creacion de usaurio",
            error: e.message
        });
    }
}

const confirm_user = async (req, res) => {
    try {
        const user_to_confirm = await User.findOne({
            token: req.body.token
        });

        user_to_confirm.token = null;
        user_to_confirm.confirmado = true;
        await user_to_confirm.save();
        return res.status(200).json({
            status: true,
            message: "Confirmando cuenta de usuario"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en confirmacion de cuenta de usuario",
            error: e.message
        });
    }
}

const login_user = async (req, res) => {
    try {
        const userInSession = await User.findOne({
            email: req.body.email
        });

        const dataToGenerateJWT: GenerateJWT = {
            nombre: userInSession.nombre,
            id: userInSession._id.toString(),
            email: userInSession.email,
            rol: userInSession.rol
        }
        const jwt = generateJWT(dataToGenerateJWT);

        return res.status(200).json({
            status: true,
            token: jwt
        })
    } catch (e) {
        return res.status(500).json({
            status: false,
            messsage: "Ocurrio un error en el login de usuario",
            error: e.message
        });
    }
}

const send_email_reset_password = async (req, res) => {
    try {
        const token_reset_password = uuidv4();
        const user_to_send_email = await User.findOne({
            email: req.body.email
        });
        const data_to_send_email: EmailResetPassword = {
            nombre: user_to_send_email.nombre + " " + user_to_send_email.apellidos,
            subject: "Reestablecer password.",
            email: user_to_send_email.email,
            token: token_reset_password
        };
        await email_reset_password(data_to_send_email);
        user_to_send_email.token = token_reset_password;
        await user_to_send_email.save();

        return res.status(200).json({
            status: true,
            message: "Email de reset de password enviado correctamente",
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en envio de email para reestablecimiento de password",
            error: e.message
        });
    }
}

const reset_password = async (req, res) => {
    try {
        const {new_password, token} = req.body;
        const new_password_hash = await bcrypt.hash(new_password, 10);
        const user_to_reset_password = await User.findOne({
            token: token
        });
        user_to_reset_password.password = new_password_hash;
        user_to_reset_password.token = null;
        await user_to_reset_password.save();

        return res.status(200).json({
            status: true,
            message: "Password actualizada correctamente"
        });

    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en guardado de nuevo password",
            error: e.message
        });
    }
}

const show_user = async (req, res) => {
    try {
        const user_to_show = req.user;
        return res.status(200).json({
            status: true,
            user: user_to_show
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en busqueda de usuario",
            error: e.message
        });
    }
}

const edit_profile = async (req, res) => {
    try {
        const user_to_edit = req.user;
        await User.findByIdAndUpdate(user_to_edit._id, {
            $set: {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                email: req.body.email,
            }
        });

        return res.status(200).json({
            status: true,
            message: "Usuario actualizado correctamente",
        });
    }catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en editar usuario",
            error: e.message
        });
    }
}

const update_password = async (req, res) => {
    try {
        const user_to_update_password = req.user;
        const password_hash = await bcrypt.hash(req.body.new_password, 10);
        await User.findByIdAndUpdate(user_to_update_password._id, {
            $set: {
                password: password_hash
            }
        });
        return res.status(200).json({
            status: true,
            message: "Password actualizada correctamente"
        });
    }catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en actualizacion de password"
        });
    }
}

const verify_password = async (req, res) => {
    try {
        const user_to_verify = await User.findOne({
            _id: req.user._id
        }).select("password");

        const password_check = await bcrypt.compare(req.body.password, user_to_verify.password);
        if (!password_check) {
            return res.status(409).json({
                status: false
            });
        }
        return res.status(200).json({
            status: true
        });
    }catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en la verificacion del password",
            error: e.message
        });
    }
}

const logout_user = (req, res) => {
    try {
        req.user = null;
        return res.status(200).json({
            status: true,
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en logout de usuario",
        });
    }
}

export {
    prueba,
    create_user,
    confirm_user,
    login_user,
    send_email_reset_password,
    reset_password,
    show_user,
    logout_user,
    edit_profile,
    update_password,
    verify_password
}