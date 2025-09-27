import User from "../models/User";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import emailConfirmUser from "../emails/EmailConfirmUser";
import {EmailConfirmUser} from "../types";

const prueba = (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Funcionando controlador de usuarios"
    });
}

const create_user = async (req, res) => {
    try {
        const {nombre, apellidos, email, password} = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const token = uuidv4();
        const user_to_create = await User.create({
            nombre,
            apellidos,
            email,
            token,
            password: password_hash,
        });
        const DataEmailConfirmUser: EmailConfirmUser = {
            email,
            nombre,
            subject: "Confirma tu Cuenta en UpTask",
            token
        }
        await emailConfirmUser(DataEmailConfirmUser);
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

export {
    prueba,
    create_user
}