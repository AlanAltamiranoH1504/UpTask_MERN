import type {FormCreateNote} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {getJWTLocalStorage} from "./GetJWTLocalStorage.ts";
import {responseCreateTarea, responseFindAllNotes, responseGeneralNote} from "../schemas/NotasSchemas.ts";
import axios from "axios";

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

export async function deleteNoteDELETE(idNote: string) {
    try {
        const responseAPI = await ClienteAxios.delete(`/notas/delete_note/${idNote}`, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseGeneralNote.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    }catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la eliminación de la nota"
            }
        }
        throw e;
    }
}