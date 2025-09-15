import {z} from "zod";

export const responseCreateTareaAPI = z.object({
    status: z.boolean(),
    message: z.string()
});