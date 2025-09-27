import z from "zod";

export const responseConfirmUserAPI = z.object({
    status: z.boolean(),
    message: z.string()
});