import {z} from "zod";

export const responseCreateProyecto = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseFindAllProyectos = z.object({
    proyectos: z.array(
        z.object({
            _id: z.string(),
            nombreProyecto: z.string(),
            nombreCliente: z.string(),
            descripcion: z.string(),
            status: z.boolean(),
            tareas: z.array(z.string()),
            updatedAt: z.string(),
            __v: z.number(),
        })
    )
});