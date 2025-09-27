import User from "../models/User";
import bcrypt from "bcrypt";

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
        const user_to_create = await User.create({
            nombre,
            apellidos,
            email,
            password: password_hash,
        });
        return res.status(201).json({
            status: true,
            message: "Usuario creado correctamente"
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