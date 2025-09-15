import type {FormCreateTarea} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {responseCreateTareaAPI} from "../schemas/TareasSchemas.ts";

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