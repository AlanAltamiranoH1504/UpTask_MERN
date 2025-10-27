import type {FormCreateNote} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {getJWTLocalStorage} from "./GetJWTLocalStorage.ts";
import {responseCreateTarea, responseFindAllNotes} from "../schemas/NotasSchemas.ts";

export async function createNotePOST(data: FormCreateNote) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.post(`/notas/create_note/task/${data.tarea}`, data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseCreateTarea.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function findAllNotesGET(idTarea: string) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.get(`/notas/find_all_notes/task/${idTarea}`, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseFindAllNotes.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}