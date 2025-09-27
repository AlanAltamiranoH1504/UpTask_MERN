import {z} from "zod";

export const responseCreateTareaAPI = z.object({
    status: z.boolean(),
    message: z.string()
});
export const responseFindTareaByIdAPI = z.object({
    status: z.boolean(),
    tarea: z.object({
        _id: z.string(),
        nombre: z.string(),
        descripcion: z.string(),
        proyecto: z.object({
            _id: z.string(),
            nombreProyecto: z.string(),
            nombreCliente: z.string(),
            descripcion: z.string(),
        }),
        status: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })
});

export const responseUpdateTareaAPI = z.object({
    status: z.boolean(),
    message: z.string(),
});
export const responseDeleteTareaAPI = z.object({
    status: z.boolean(),
    message: z.string(),
});

export const responseUpdateStatusTareaAPI = z.object({
    status: z.boolean(),
    message: z.string()
});