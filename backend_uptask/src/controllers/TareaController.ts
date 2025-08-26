import Tarea from "../models/Tarea";

const prueba = (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Prueba completa desde tareaController"
    });
}

const saveTarea = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, descripcion, status} = req.body;

        const tareaToSave = await Tarea.create({
            nombre,
            descripcion,
            status,
            proyecto: id
        });
        return res.status(201).json({
            status: true,
            message: "Tarea creada correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en creación de tarea",
            error: e.message
        });
    }
}
export {
    prueba,
    saveTarea
}