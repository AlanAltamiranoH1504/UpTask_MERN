import type {DataToRemoveMember, FormCreateProyectoType, FormSearchMembers, ProyectoDB} from "../types";
import clienteAxios from "../axios/ClienteAxios.ts";
import {
    responseAddMemberTeam,
    responseCreateProyecto,
    responseDeleteProyecto,
    responseFindAllProyectos, responseFindMembers,
    responseFindProyectoById, responseRemoveMemberTeam, responseSearchMember, responseUpdateProyecto
} from "../schemas/ProyectosSchemas.ts";
import {getJWTLocalStorage} from "./GetJWTLocalStorage.ts";
import type {DataAddMember} from "../components/proyectos/members/SearchResult.tsx";

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

export async function findTeamMembersGET(id: string) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.get(`/proyectos/${id}/equipo`, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseFindMembers.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function searchMemberPOST(data: FormSearchMembers) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.post(`/proyectos/${data._id}/equipo/busqueda`, data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseSearchMember.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function addMemberTeamPOST(data: DataAddMember) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.post(`/proyectos/${data.id_project}/equipo/agregado`, data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseAddMemberTeam.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function removeMemberTeamPOST(data: DataToRemoveMember) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await clienteAxios.post(`/proyectos/${data.idProject}/equipo/eliminado`, data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseRemoveMemberTeam.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}