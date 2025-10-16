import mongoose, {Types, ObjectId, Document, PopulatedDoc} from "mongoose";
import {TareaStatus} from "../models/Tarea";

export interface TProyecto extends Document {
    _id: Types.ObjectId,
    nombreProyecto: string,
    nombreCliente: string,
    descripcion: string,
    usuario: string,
    tareas: PopulatedDoc<TTarea & Document>[]
}

export interface TTarea extends Document {
    _id: Types.ObjectId,
    nombre: string,
    descripcion: string,
    proyecto: Types.ObjectId,
    status: TareaStatus
}

export interface IUsuario extends Document {
    _id: Types.ObjectId,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    token: string,
    confirmado: boolean,
    empresa: Types.ObjectId
}

export interface IEmpresa extends Document {
    _id: Types.ObjectId,
    nombre: string,
    razon_social: string,
    email: string,
    status: boolean
}

export type EmailConfirmUser = {
    nombre: string,
    email: string,
    subject: string,
    token: string
}

export type EmailResetPassword = {
    nombre: string,
    email: string,
    subject: string,
    token: string
}
export type GenerateJWT = {
    id: string;
    nombre: string;
    email: string;
    rol: number;
}