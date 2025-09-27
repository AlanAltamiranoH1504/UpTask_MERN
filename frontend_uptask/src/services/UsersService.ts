import type {FormConfirmUser} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {responseConfirmUserAPI} from "../schemas/UsersSchemas.ts";

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