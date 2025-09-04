import type {FormCreateProyectoType} from "../types";
import clienteAxios from "../axios/ClienteAxios.ts";
import {responseCreateProyecto} from "../schemas/ProyectosSchemas.ts";

export async function createProyectoPOST(data: FormCreateProyectoType) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.post("/proyectos", data);
        const resultAPI = responseCreateProyecto.safeParse(responseAPI);
        if (resultAPI.success) {
            console.log("")
        }
    }catch (e) {
        throw e;
    }
}