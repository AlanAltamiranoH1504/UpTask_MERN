import type {FormCreateTarea, FormEditTarea} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {responseCreateTareaAPI, responseFindTareaByIdAPI, responseUpdateTareaAPI} from "../schemas/TareasSchemas.ts";

export async function createTareaPOST(tarea: FormCreateTarea) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.post(`/tareas/${tarea.proyecto}/create`, tarea);
        const resultAPI = responseCreateTareaAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function findTareaaByIdGET(idTarea: string) {
    try {
        const responseAPI = await ClienteAxios.get(`/tareas/${idTarea}`);
        const resultAPI = responseFindTareaByIdAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        throw new Error("Error en busqueda tarea por id");
    } catch (e) {
        // @ts-ignore
        throw new Error("Error en busqueda tarea por id: " + e.message);
    }
}

export async function updateTareaByIdPUT(data: FormEditTarea) {
    try {
        const responseAPI = await ClienteAxios.put(`/tareas/${data._id}/update`, data);
        const resultAPI = responseUpdateTareaAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        throw new Error("Error en actualización de tarea");
    } catch {
        throw new Error("Error en actualizacion de tarea");
    }
}