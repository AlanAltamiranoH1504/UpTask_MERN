import {z} from "zod";

export const responseCreateProyecto = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseUpdateProyecto = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseDeleteProyecto = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseFindAllProyectos = z.object({
    status: z.boolean(),
    proyectos: z.array(
        z.object({
            _id: z.string(),
            nombreProyecto: z.string(),
            nombreCliente: z.string(),
            descripcion: z.string(),
            status: z.boolean(),
            usuario: z.object({
                _id: z.string(),
                nombre: z.string(),
                apellidos: z.string(),
                email: z.string(),
            }),
            tareas: z.array(z.string()),
            equipo: z.array(z.string()),
            createdAt: z.string(),
            updatedAt: z.string(),
            __v: z.number(),
        })
    )
});

export const responseFindProyectoById = z.object({
    status: z.boolean(),
    proyecto: z.object({
        _id: z.string(),
        nombreProyecto: z.string(),
        nombreCliente: z.string(),
        descripcion: z.string(),
        usuario: z.string(),
        status: z.boolean(),
        tareas: z.array(z.object({
            _id: z.string(),
            nombre: z.string(),
            descripcion: z.string(),
            proyecto: z.string(),
            status: z.string()
        })),
        equipo: z.array(z.string()),
    })
});

export const responseFindMembers = z.object({
    status: z.boolean(),
    members: z.object({
        nombreProyecto: z.string(),
        nombreCliente: z.string(),
        descripcion: z.string(),
        equipo: z.array(
            z.object({
                _id: z.string(),
                nombre: z.string(),
                apellidos: z.string(),
                email: z.string(),
            })
        )
    })
});

export const responseSearchMember = z.object({
    status: z.boolean(),
    usuarios: z.object({
        _id: z.string(),
        nombre: z.string(),
        apellidos: z.string(),
        email: z.string(),
    })
});

export const responseAddMemberTeam = z.object({
    status: z.boolean(),
    message: z.string(),
});

export const responseRemoveMemberTeam = z.object({
    status: z.boolean(),
    message: z.string()
});