import {z} from "zod"
import type {responseFindProyectoById} from "../schemas/ProyectosSchemas.ts";

// TYPES PARA DATOS DE LA DB
export type ProyectoDB = {
    id: string;
    nombreProyecto: string;
    nombreCliente: string;
    descripcion: string;
    status: boolean;
}

export type TareaDB = {
    id: string,
    nombre: string,
    descripcion: string,
    proyecto: string,
    status: string
}

// TYPES PARA FORMULARIOS
export type FormCreateProyectoType = Pick<ProyectoDB, "nombreProyecto" | "nombreCliente" | "descripcion">
export type FormEditarProyectoType = Pick<ProyectoDB, "nombreProyecto" | "nombreCliente" | "descripcion" | "status">
export type FormCreateTarea = Pick<TareaDB, "nombre" | "descripcion" | "proyecto" | "status">

// INFERENCIAS
export type FindProyectoById = z.infer<typeof responseFindProyectoById>
