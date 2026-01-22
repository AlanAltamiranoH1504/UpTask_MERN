import {z} from "zod"
import {type responseFindProyectoById, responseSearchMember} from "../schemas/ProyectosSchemas.ts";
import {type responseShowUserAPI, responseUserInSessionAPI} from "../schemas/UsersSchemas.ts";

// TYPES PARA DATOS DE LA DB
export type ProyectoDB = {
    id: string;
    nombreProyecto: string;
    nombreCliente: string;
    descripcion: string;
    status: boolean;
}

export type TareaDB = {
    _id: string,
    nombre: string,
    descripcion: string,
    proyecto: string,
    status: string
}

export type UserDB = {
    _id: string,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    token: string,
    confirmado: boolean,
    empresa: string,
    rol: string
}

// TYPES PARA FORMULARIOS
export type FormCreateProyectoType = Pick<ProyectoDB, "nombreProyecto" | "nombreCliente" | "descripcion">
export type FormEditarProyectoType = Pick<ProyectoDB, "nombreProyecto" | "nombreCliente" | "descripcion" | "status">
export type FormCreateTarea = Pick<TareaDB, "nombre" | "descripcion" | "proyecto" | "status">
export type FormEditTarea = Pick<TareaDB, "nombre" | "descripcion" | "status" | "_id">
export type FormEditStatusTarea = Pick<TareaDB, "status" | "_id">
export type FormConfirmUser = Pick<UserDB, "token">
export type FormLogin = Pick<UserDB, "email" | "password">
export type FormRegisterUser = Pick<UserDB, "nombre" | "apellidos" | "email" | "password" | "empresa">
export type FormResetPassword = Pick<UserDB, "email">
export type FormCreateNote = {
    titulo: string,
    contenido: string
    tarea: string
}
export type FormSearchMembers = {
    email: Pick<UserDB, "email">,
    _id: string
}
export type FormSaveNewPassword = {
    new_password: string,
    token: string,
    confrm_password: string,
}
export type DataToRemoveMember = {
    id: string,
    idProject: string,
    email: string
}
export type FormEditProfile = {
    nombre: string,
    apellidos: string,
    email: string,
    rol: string
}

export type FormChangePassword = {
    old_password: string,
    new_password: string,
    confirm_password: string
}

// INFERENCIAS
export type UserInSession = z.infer<typeof responseUserInSessionAPI>
export type FindProyectoById = z.infer<typeof responseFindProyectoById>
export type ShowUserInfer = z.infer<typeof responseShowUserAPI>
export type SearchMemberResult = z.infer<typeof responseSearchMember>
