import Tarea from "../models/Tarea";
import Proyecto from "../models/Proyecto";

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

        //Guardado de tarea en proyecto
        await Proyecto.findByIdAndUpdate(id, {
            $push: {
                tareas: tareaToSave._id
            }
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

const findTareaById = async (req, res) => {
    try {
        const tareaToShow = await Tarea.findById(req.params.id)
            .select("-createdAt -updatedAt -__v")
            .populate("proyecto", "_id nombreProyecto nombreCliente descripcion");
        return res.status(200).json({
            status: true,
            tareas: tareaToShow
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en busqueda de tarea",
            error: e.message
        });
    }
}

const findAllTareasByIdProyecto = async (req, res) => {
    try {
        const tareasByProyectoId = await Tarea.find({proyecto: req.params.idProyecto})
            .populate("proyecto", "_id nombreProyecto")
            .select("-__v -createdAt -updatedAt");
        if (!tareasByProyectoId) {
            return res.status(404).json({
                status: false,
                message: `No hay tareas disponibles para el proyecto con id ${req.params.idProyectoId}`
            });
        }

        return res.status(200).json({
            status: true,
            tareas: tareasByProyectoId
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Ocurrio un error en la busqueda de tareas por id de proyecto",
            error: e.message
        });
    }
}

const updateTarea = async (req, res) => {
    try {
        const tareaToUpdate = await Tarea.findByIdAndUpdate(req.params.id, {
            $set: {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                status: req.body.status
            }
        }, {new: true});

        return res.status(200).json({
            status: true,
            message: "Tarea actualizada correctamente"
        })
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en actualización de tarea",
            error: e.message
        });
    }
}

const updateStatus = async (req, res) => {
    try {
        const tareaToUpdate = await Tarea.findByIdAndUpdate(req.params.id, {
            $set: {
                status: req.body.status
            }
        }, {new: true});
        return res.status(200).json({
            status: true,
            message: "Estatus de tarea actualizada correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en actualización de estatus de tarea",
            error: e.message
        });
    }
}

const deleteById = async (req, res) => {
    try {
        const tareaToDelete = await Tarea.findByIdAndDelete(req.params.id);
        const deleteTareaInProyecto = await Proyecto.findByIdAndUpdate(tareaToDelete.proyecto, {
            $pull: {
                tareas: req.params.id
            }
        });
        await tareaToDelete.deleteOne({_id: req.params.id});
        return res.status(200).json({
            status: true,
            message: "Tarea eliminada correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en eliminación de tarea",
            error: e.message
        });
    }
}

export {
    prueba,
    saveTarea,
    findTareaById,
    deleteById,
    updateTarea,
    updateStatus,
    findAllTareasByIdProyecto
}