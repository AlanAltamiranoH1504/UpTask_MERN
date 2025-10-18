import z from "zod";

export const responseFindAllEmpresas = z.object({
    status: z.boolean(),
    empresas: z.array(
        z.object({
            _id: z.string(),
            nombre: z.string(),
            email: z.string()
        })
    )
});