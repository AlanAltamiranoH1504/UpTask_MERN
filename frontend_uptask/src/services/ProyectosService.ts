import type {FormCreateProyectoType, ProyectoDB} from "../types";
import clienteAxios from "../axios/ClienteAxios.ts";
import {
    responseCreateProyecto,
    responseDeleteProyecto,
    responseFindAllProyectos,
    responseFindProyectoById, responseUpdateProyecto
} from "../schemas/ProyectosSchemas.ts";
import {getJWTLocalStorage} from "./GetJWTLocalStorage.ts";

export async function createProyectoPOST(data: FormCreateProyectoType) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.post("/proyectos", data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
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
        const responseAPI = await clienteAxios.get("/proyectos", {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseFindAllProyectos.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function findProyectoByIdGET(id: string) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.get(`/proyectos/${id}`, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseFindProyectoById.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data
        }
        throw new Error("Error en respuesta de api");
    } catch (e) {
        throw e;
    }
}

export async function updateProyectoByIdPUT(data: ProyectoDB) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.put(`/proyectos/${data.id}`, data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseUpdateProyecto.safeParse(responseAPI.data);
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
        const responseAPI = await clienteAxios.delete(`/proyectos/${id}`, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseDeleteProyecto.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data
        }
    } catch (e) {
        throw e;
    }
}