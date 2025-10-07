import type {FormConfirmUser, FormLogin} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {responseConfirmUserAPI, responseLoginUserAPI} from "../schemas/UsersSchemas.ts";

export async function confirmUserPOST(data: FormConfirmUser) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.post(`/users/confirm/${data.token}`, data);
        const resultAPI = responseConfirmUserAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e
    }
}

export async function loginUserPOST(data: FormLogin) {
    try {
        const responseAPI = await ClienteAxios.post("/users/login", data);
        const resultAPI = responseLoginUserAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e
    }
}