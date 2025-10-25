import mongoose, {Types, ObjectId} from "mongoose";
import {TTarea} from "../types";
const {Schema} = mongoose;

const tareaStatus = {
    pendiente: "Pendiente",
    enEspera: "En espera",
    enProgreso: "En progreso",
    revisando: "Revisando",
    completada: "Completada",
} as const;

export type TareaStatus = typeof tareaStatus[keyof typeof tareaStatus];

const tareaSchema = new Schema<TTarea>({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: "Proyecto",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(tareaStatus),
        default: tareaStatus.pendiente
    },
    completedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {timestamps: true});
const Tarea = mongoose.model<TTarea>("Tarea", tareaSchema);
export default Tarea;