import mongoose, {Types, ObjectId, Document, PopulatedDoc} from "mongoose";
import {TareaStatus} from "../models/Tarea";
export interface TProyecto extends Document {
    _id: Types.ObjectId,
    nombreProyecto: string,
    nombreCliente: string,
    descripcion: string,
    tareas: PopulatedDoc<TTarea & Document>[]
}
export interface TTarea extends Document  {
    _id: Types.ObjectId,
    nombre: string,
    descripcion: string,
    proyecto: Types.ObjectId,
    status: TareaStatus
}

export type EmailConfirmUser = {
    nombre: string,
    email: string,
    subject: string,
    token: string
}