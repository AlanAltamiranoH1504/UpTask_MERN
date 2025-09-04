// TYPES PARA DATOS DE LA DB
export type ProyectoDB = {
    id: number;
    nombreProyecto: string;
    nombreCliente: string;
    descripcion: string;
}

// TYPES PARA FORMULARIOS
export type FormCreateProyectoType = Pick<ProyectoDB, "nombreProyecto" | "nombreCliente" | "descripcion">
