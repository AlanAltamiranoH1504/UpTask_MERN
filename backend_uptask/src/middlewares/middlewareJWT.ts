import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

export const middlewareJWT = async (req, res, next) => {
    const tokenWithBearer: string = req.headers.authorization;

    if (!tokenWithBearer) {
        return res.status(401).json({
            status: false,
            message: "Token JWT No Encontrado en Cabeceras"
        })
    }

    try {
        const jwtWithoutBearer = tokenWithBearer.split(" ")[1];
        const verifyJWT = jwt.verify(jwtWithoutBearer, process.env.JWT_SECRET_KEY);

        if (!verifyJWT) {
            throw new Error("JWT No Valido");
        }

        if (typeof  verifyJWT === "string") {
            throw new Error("Token JWT Corrupto")
        }

        //Search user
        const {id, email, rol} = verifyJWT;
        const userInSesion = await User.findOne({
            email,
            _id: id
        }).select("_id nombre apellidos email");

        if (!userInSesion) {
            throw new Error("Error en identificación de usuario por JWT");
        }

        req.user = userInSesion;
        next();
    } catch (e) {
        return res.status(401).json({
            status: false,
            message: e.message || "Error del servidor en proceso de validacion de jwt",
        });
    }
}