import z from "zod";

export const responseConfirmUserAPI = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseLoginUserAPI = z.object({
    status: z.boolean(),
    token: z.string()
});

export const responseRegisterUserAPI = z.object({
    status: z.boolean(),
    message: z.string()
});
export const responseResetPasswordAPI = z.object({
    status: z.boolean(),
    message: z.string()
});
export const responseSaveNewPasswordAPI = z.object({
    status: z.boolean(),
    message: z.string()
});
export const responseShowUserAPI = z.object({
    status: z.boolean(),
    user: z.object({
        _id: z.string(),
        nombre: z.string(),
        apellidos: z.string(),
        email: z.string(),
        rol: z.object({
            _id: z.string(),
            nombre: z.string()
        })
    })
});
export const responseLogoutUserAPI = z.object({
    status: z.boolean()
});

export const responseUserInSessionAPI = z.object({
    status: z.boolean(),
    user: z.object({
        _id: z.string(),
        nombre: z.string(),
        apellidos: z.string(),
        email: z.string(),
        rol: z.object({
            _id: z.string(),
            nombre: z.string(),
        })
    })
});

export const responseGeneralUser = z.object({
    status: z.boolean(),
    message: z.string()
});
