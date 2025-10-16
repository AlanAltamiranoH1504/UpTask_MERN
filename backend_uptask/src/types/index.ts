import mongoose, {Types, ObjectId, Document, PopulatedDoc} from "mongoose";
import {TareaStatus} from "../models/Tarea";

// * Interfaces de modelos de moongse

export interface TProyecto extends Document {
    _id: Types.ObjectId,
    nombreProyecto: string,
    nombreCliente: string,
    descripcion: string,
    status: boolean,
    usuario: Types.ObjectId,
    tareas: PopulatedDoc<TTarea & Document>[]
    equipo: PopulatedDoc<IUsuario & Document>[]
}

export interface TTarea extends Document {
    _id: Types.ObjectId,
    nombre: string,
    descripcion: string,
    proyecto: Types.ObjectId,
    status: TareaStatus
}

export interface IUsuario extends Document {
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
    usuarios: PopulatedDoc<IUsuario & Document>[]
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