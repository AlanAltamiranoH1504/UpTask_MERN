import Proyecto from "../models/Proyecto";

const findAllProyectos = async (request, response) => {
    try {
        const proyectos = await Proyecto.find({
            status: true
        });
        if (proyectos.length <= 0) {
            return response.status(404).json({
                status: false,
                message: "No se encontraron proyectos registrados"
            }, 404);
        }
        return response.status(200).json({
            status: true,
            proyectos: proyectos
        });
    } catch (e) {
        return response.status(500).json({
            status: false,
            message: "Error en listado de proyectos",
            error: e.message
        });
    }
}

const findProyectoById = async (req, res) => {
    try {
        const proyectoToShow = await Proyecto.findById(req.params.id);
        return res.status(200).json({
            status: true,
            proyecto: proyectoToShow
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Ocurrio un error en la busqueda del proyecto",
            error: e.message
        });
    }
}

const saveProyecto = async (req, res) => {
    try {
        const proyectoToCreate = await Proyecto.create({
            nombreProyecto: req.body.nombreProyecto,
            nombreCliente: req.body.nombreCliente,
            descripcion: req.body.descripcion
        });
        return res.status(201).json({
            status: true,
            message: "Proyecto creado correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Ocurrio un error en la creación del proyecto",
            error: e.message
        });
    }
}

const updateProyecto = async (req, res) => {
    try {
        const proyectoToUpdate = await Proyecto.findByIdAndUpdate(req.params.id, {
            $set: {
                nombreProyecto: req.body.nombreProyecto,
                nombreCliente: req.body.nombreCliente,
                descripcion: req.body.descripcion,
                status: req.body.status
            }
        }, {new: true});
        return res.status(200).json({
            status: true,
            message: "Proyecto actualizado correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Ocurrio un error en la actualización del proyecto",
            error: e.message
        });
    }
}

const deleteProyecto = async (req, res) => {
    try {
        const proyectoToDelete = await Proyecto.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: true,
            message: "Proyecto eliminado correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Ocurrio un error en la eliminación del proyecto",
            error: e.message
        });
    }
}
export {
    findAllProyectos,
    saveProyecto,
    updateProyecto,
    findProyectoById,
    deleteProyecto
}