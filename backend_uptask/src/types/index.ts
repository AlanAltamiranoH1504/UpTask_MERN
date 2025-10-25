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
    status: TareaStatus,
    completedBy: Types.ObjectId,
    
}

export interface IUsuario extends Document {
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    token: string,
    confirmado: boolean,
    confirmado_empresa: boolean,
    empresa: Types.ObjectId,
    rol: Types.ObjectId
}

export interface IRol extends Document {
    nombre: string,
    slug: string,
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

export type EmailConfirmEmpresa = {
    nombre_empresa: string,
    email_empresa: string,
    subject: string,
    email_usuario: string,
    id_ususario: mongoose.Schema.Types.ObjectId
}

export type EmailConfirmUserByCompany = {
    email_user: string,
    subject: string
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
    rol: Types.ObjectId;
}

export type TypeRow = {
    Rol: string
}