import type {FormCreateProyectoType} from "../types";
import clienteAxios from "../axios/ClienteAxios.ts";
import {responseCreateProyecto, responseDeleteProyecto, responseFindAllProyectos} from "../schemas/ProyectosSchemas.ts";

export async function createProyectoPOST(data: FormCreateProyectoType) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.post("/proyectos", data);
        const resultAPI = responseCreateProyecto.safeParse(responseAPI);
        if (resultAPI.success) {
            console.log("")
        }
    } catch (e) {
        throw e;
    }
}

export async function findAllProyectosGET() {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.get("/proyectos");
        const resultAPI = responseFindAllProyectos.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function deleteProyectoDELETE(id: string) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.delete(`/proyectos/${id}`);
        const resultAPI = responseDeleteProyecto.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data
        }
    } catch (e) {
        throw e;
    }
}