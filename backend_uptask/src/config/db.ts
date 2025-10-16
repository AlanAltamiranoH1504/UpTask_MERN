import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const conexionDB = async () => {
    try {
        await mongoose.connect(process.env.URI_DATA_BASE);
    } catch (e) {
        console.log("Error en conexion a la base de datos");
        console.log(e.message);
    }
}