import Proyecto from "../models/Proyecto";

export const managger_project_middleware = async (req, res, next) => {
    try {
        const user_in_session = req.user;
        const details_project = await Proyecto.findById(req.params.id);

        if (user_in_session._id.toString() !== details_project.usuario._id.toString()) {
            return res.status(403).json({
                status: false,
                message: "Sin permisos de autorizacion"
            });
        }
        next();
    } catch (e) {
        return res.status(403).json({
            status: false,
            message: "Permisos denegados"
        });
    }
}