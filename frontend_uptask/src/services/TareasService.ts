import type {FormCreateTarea, FormEditStatusTarea, FormEditTarea} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {
    responseCreateTareaAPI,
    responseDeleteTareaAPI,
    responseFindTareaByIdAPI, responseUpdateStatusTareaAPI,
    responseUpdateTareaAPI
} from "../schemas/TareasSchemas.ts";
import {getJWTLocalStorage} from "./GetJWTLocalStorage.ts";
import axios from "axios";

export async function createTareaPOST(tarea: FormCreateTarea) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.post(`/tareas/${tarea.proyecto}/create`, tarea, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
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
        const responseAPI = await ClienteAxios.get(`/tareas/${idTarea}`, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
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
        const responseAPI = await ClienteAxios.put(`/tareas/${data._id}/update`, data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseUpdateTareaAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        throw new Error("Error en actualización de tarea");
    } catch {
        throw new Error("Error en actualizacion de tarea");
    }
}

export async function updateStatusTaskPUT(data: FormEditStatusTarea) {
    try {
        const responseAPI = await ClienteAxios.put(`/tareas/${data._id}/update-status`, data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseUpdateStatusTareaAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la actualizacion del estado"
            }
        }
        throw e;
    }
}

export async function deleteTareaByIdDELETE(idTask: string) {
    try {
        const responseAPI = await ClienteAxios.delete(`/tareas/${idTask}/delete`, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseDeleteTareaAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        throw new Error("Error en eliminacion de tarea");
    } catch {
        throw new Error("Error en eliminacion de tarea");
    }
}