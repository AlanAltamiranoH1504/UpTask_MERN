import {z} from "zod";

export const responseCreateTarea = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseFindAllNotes = z.object({
    status: z.boolean(),
    notas: z.array(
        z.object({
            _id: z.string(),
            titulo: z.string(),
            contenido: z.string(),
            createdBy: z.string(),
            tarea: z.object({
                _id: z.string(),
                nombre: z.string(),
                descripcion: z.string(),
            })
        })
    )
});