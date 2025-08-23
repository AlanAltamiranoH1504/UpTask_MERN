import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const conexionDB = async () => {
    try {
        const conexion = await mongoose.connect(process.env.URI_DATA_BASE);
        console.log("Conexion correcta a la base de datos");
    } catch (e) {
        console.log("Error en conexion a la base de datos");
        console.log(e.message);
    }
}