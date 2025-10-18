import clienteAxios from "../axios/ClienteAxios.ts";
import {responseFindAllEmpresas} from "../schemas/EmpresaSchemas.ts";

export async function findAllEmpresasGET() {
    try {
        const responseAPI = await clienteAxios.get("/empresa/types_empresa");
        const resultAPI = responseFindAllEmpresas.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}