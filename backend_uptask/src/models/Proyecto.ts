import mongoose from "mongoose";
import {TProyecto} from "../types";
const {Schema, Document} = mongoose;
const proyectoSchema = new Schema({
    nombreProyecto: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombreCliente: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    tareas: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tareas"
        }
    ]
},{timestamps: true});
const Proyecto = mongoose.model<TProyecto>("Proyecto", proyectoSchema);
export default Proyecto;