import {z} from "zod";

export const responseCreateProyecto = z.object({
    status: z.boolean(),
    message: z.string()
});