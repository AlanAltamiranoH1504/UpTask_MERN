import type {
    FormChangePassword,
    FormConfirmUser,
    FormEditProfile,
    FormLogin,
    FormRegisterUser,
    FormResetPassword,
    FormSaveNewPassword, FormVerifyPassword
} from "../types";
import ClienteAxios from "../axios/ClienteAxios.ts";
import {
    responseConfirmUserAPI, responseGeneralUser,
    responseLoginUserAPI, responseLogoutUserAPI,
    responseRegisterUserAPI,
    responseResetPasswordAPI, responseShowUserAPI, responseVerifyPassword
} from "../schemas/UsersSchemas.ts";
import {getJWTLocalStorage} from "./GetJWTLocalStorage.ts";
import axios from "axios";

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

export async function showUserGET() {
    try {
        const responseAPI = await ClienteAxios.get("/users/show_user", {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseShowUserAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function logoutUserGET() {
    try {
        const responseAPI = await ClienteAxios.get("/users/logout_user", {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseLogoutUserAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            localStorage.removeItem("jwt_uptask");
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function editProfilePUT(data: FormEditProfile) {
    try {
        const responseAPI = await ClienteAxios.put("/users/edit_profile", data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseGeneralUser.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la actualizacion de datos"
            }
        }
        throw e;
    }
}

export async function changePasswordPUT(data: FormChangePassword) {
    try {
        const responseAPI = await ClienteAxios.put("/users/update_password", data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseGeneralUser.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en el cambio de password"
            }
        }
        throw e;
    }
}

export async function verifyPasswordPOST(data: FormVerifyPassword) {
    try {
        const respnseAPI = await ClienteAxios.post("/users/verify_password", data, {
            headers: {
                "Authorization": "Bearer " + getJWTLocalStorage()
            }
        });
        const resultAPI = responseVerifyPassword.safeParse(respnseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la verificacion de password"
            }
        }
        throw e;
    }
}