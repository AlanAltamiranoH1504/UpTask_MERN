import type {FormConfirmUser, FormLogin, FormRegisterUser, FormResetPassword, FormSaveNewPassword} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {
    responseConfirmUserAPI,
    responseLoginUserAPI,
    responseRegisterUserAPI,
    responseResetPasswordAPI
} from "../schemas/UsersSchemas.ts";

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
    // eslint-disable-next-line no-useless-catch
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

export async function registerUserPOST(data: FormRegisterUser) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.post("/users/create_user", data);
        const resultAPI = responseRegisterUserAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function resetPasswordPOST(data: FormResetPassword) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.post("/users/send_email_reset_password", data);
        const resultAPI = responseResetPasswordAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function saveNewPasswordPOST(data: FormSaveNewPassword) {
    // eslint-disable-next-line no-useless-catch
    try {
        const responseAPI = await ClienteAxios.post("/users/reset_password", data);
        const resultAPI = responseResetPasswordAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e
    }
}