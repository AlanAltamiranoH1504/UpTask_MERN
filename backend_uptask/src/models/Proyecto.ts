import mongoose from "mongoose";
import {TProyecto} from "../types";
const {Schema, Document} = mongoose;
const proyectoSchema = new Schema<TProyecto>({
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
        default: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tareas: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tarea"
        }
    ],
    equipo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{timestamps: true});
const Proyecto = mongoose.model<TProyecto>("Proyecto", proyectoSchema);
export default Proyecto;