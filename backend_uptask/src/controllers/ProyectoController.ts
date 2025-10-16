import Proyecto from "../models/Proyecto";
import User from "../models/User";

const findAllProyectos = async (request, response) => {
    try {
        const proyectos = await Proyecto.find({
            status: true,
            usuario: request.user._id
        }).populate("usuario", "_id nombre apellidos email");

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
        const proyectoToShow = await Proyecto.findOne({
            _id: req.params.id,
            usuario: req.user._id,
            status: true
        })
            .select("-__v -createdAt -updatedAt")
            .populate("tareas", "_id nombre descripcion status proyecto");
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

const findAllTareasByProyectoId = async (req, res) => {
    try {
        const proyectoWithTareas = await Proyecto.findById(req.params.id)
            .select("-__v -createdAt -updatedAt")
            .populate("tareas", "_id nombre descripcion status");
        return res.status(200).json({
            status: true,
            proyecto: proyectoWithTareas
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Ocurrio un error en la busqueda de tareas por id de proyecto",
            error: e.message
        });
    }
}

const saveProyecto = async (req, res) => {
    try {
        const proyectoToCreate = await Proyecto.create({
            nombreProyecto: req.body.nombreProyecto,
            nombreCliente: req.body.nombreCliente,
            descripcion: req.body.descripcion,
            usuario: req.user._id
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

const search_member = async (req, res) => {
    try {
        const user_to_add_team = await User.findOne({
            email: req.body.email
        }).select("-__v -createdAt -updatedAt -password -confirmado -token -empresa");
        return res.status(200).json({
            status: true,
            usuarios: user_to_add_team
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en agregado de usuario a equipo de trabajo"
        });
    }
}

const add_to_member_to_team = async (req, res) => {
    try {
        const {id} = req.params;
        const project_to_show = await Proyecto.findByIdAndUpdate(id, {
            $push: {
                equipo: req.body.id
            }
        });

        return res.status(200).json({
            status: true,
            message: "Miembro agregado al equipo correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: `Ocurrio un error en el agregado del usuario al equipo: ${e.message}`
        });
    }
}

const remove_member_to_team = async (req, res) => {
    try {
        const {id} = req.body;
        const id_proyecto = req.params.id;
        const removeMember = await Proyecto.findByIdAndUpdate(id_proyecto, {
            $pull: {
                equipo: id
            }
        });

        return res.status(200).json({
            status: true,
            message: "Miembro eliminado del proyecto"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: `Error en eliminacion de miembro del equipo ${e.message}`
        });
    }
}

const find_team_members = async (req, res) => {
    try {
        const id_project = req.params.id;
        const project_with_members = await Proyecto.findById(id_project).select("-__v -tareas -status -usuario -_id -createdAt -updatedAt")
            .populate({
                path: "equipo",
                select: "_id nombre apellidos email"
            });
        return res.status(200).json({
            status: true,
            members: project_with_members
        })
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: `Ocurrio un error en la busqueda de miembros del equipo ${e.message}`
        })
    }
}

export {
    findAllProyectos,
    saveProyecto,
    updateProyecto,
    findProyectoById,
    deleteProyecto,
    findAllTareasByProyectoId,
    search_member,
    add_to_member_to_team,
    remove_member_to_team,
    find_team_members
}