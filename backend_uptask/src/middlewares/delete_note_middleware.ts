import {Request, Response, NextFunction} from "express";
import {Nota} from "../models/Nota";

export const DeletNote_Middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const user_in_session = req.user;
        const id_note_to_delete = req.params.id;
        const note_to_delete = await Nota.findById(req.params.id);

        if (note_to_delete.createdBy.toString() !== user_in_session._id.toString()) {
            return res.status(403).json({
                status: false,
                message: "No tienes permisos para eliminar la nota"
            });
        }
        next();

    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en middleware de eliminacion de nota",
            error: e.message
        });
    }
}