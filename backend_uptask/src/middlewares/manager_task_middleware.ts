import Tarea from "../models/Tarea";
import Proyecto from "../models/Proyecto";

export const manager_task_middleware = async (req, res, next) => {
    try {
        const id_task = req.params.id;
        const task_details = await Tarea.findById(id_task).populate("proyecto");
        const project_id = task_details.proyecto;
        const details_project = await Proyecto.findById(project_id);

        const manager_project = details_project.usuario;
        const user_in_session = req.user._id;

        if (manager_project.toString() !== user_in_session.toString()) {
            return res.status(403).json({
                status: false,
                message: "Permisos denegados"
            });
        }
        next();
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Sin permisos"
        });
    }
}