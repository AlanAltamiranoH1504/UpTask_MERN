import jwt from "jsonwebtoken";
import {GenerateJWT} from "../types";
import dotenv from "dotenv";

dotenv.config();

export const generateJWT = (data: GenerateJWT) => {
    return jwt.sign({
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
    });
}