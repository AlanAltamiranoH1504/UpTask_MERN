import {z} from "zod"
import type {responseFindProyectoById} from "../schemas/ProyectosSchemas.ts";

// TYPES PARA DATOS DE LA DB
export type ProyectoDB = {
    id: number;
    nombreProyecto: string;
    nombreCliente: string;
    descripcion: string;
}

// TYPES PARA FORMULARIOS
export type FormCreateProyectoType = Pick<ProyectoDB, "nombreProyecto" | "nombreCliente" | "descripcion">
export type FormEditarProyectoType = Pick<ProyectoDB, "nombreProyecto" | "nombreCliente" | "descripcion">

// INFERENCIAS
export type FindProyectoById = z.infer<typeof responseFindProyectoById>
