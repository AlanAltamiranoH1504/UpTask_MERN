import z from "zod";

export const responseConfirmUserAPI = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseLoginUserAPI = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseRegisterUserAPI = z.object({
    status: z.boolean(),
    message: z.string()
});