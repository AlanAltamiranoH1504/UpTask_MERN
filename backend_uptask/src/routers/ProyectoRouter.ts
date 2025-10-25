import express from "express";
import {
    AddMemberToTeamRequest,
    CreateProyectoRequest, FindMemberToAddTeamRequest, RemoveMemberToTeamRequest,
    ShowProyectoById,
    UpdateProyectoRequest
} from "../validators/ProyectosValidators";
import {
    add_to_member_to_team,
    deleteProyecto, find_team_members,
    findAllProyectos, findAllTareasByProyectoId,
    findProyectoById, remove_member_to_team,
    saveProyecto, search_member,
    updateProyecto
} from "../controllers/ProyectoController";
import {middlewareJWT} from "../middlewares/middlewareJWT";
import {managger_project_middleware} from "../middlewares/managger_project_middleware";

const router = express.Router();

router.get("", middlewareJWT, findAllProyectos);
router.get("/:id", middlewareJWT, ShowProyectoById, findProyectoById);
router.get("/:id/tareas", middlewareJWT, ShowProyectoById, findAllTareasByProyectoId);
router.post("", middlewareJWT, CreateProyectoRequest, saveProyecto);
router.put("/:id", middlewareJWT, managger_project_middleware, ShowProyectoById, UpdateProyectoRequest, updateProyecto);
router.delete("/:id", middlewareJWT, managger_project_middleware, ShowProyectoById, deleteProyecto);

// * Rutas para miembros de equipo de proyecto
router.get("/:id/equipo", middlewareJWT, managger_project_middleware, ShowProyectoById, find_team_members);
router.post("/:id/equipo/busqueda", middlewareJWT, managger_project_middleware, ShowProyectoById, FindMemberToAddTeamRequest, search_member);
router.post("/:id/equipo/agregado", middlewareJWT, managger_project_middleware, ShowProyectoById, FindMemberToAddTeamRequest, AddMemberToTeamRequest, add_to_member_to_team);
router.post("/:id/equipo/eliminado", middlewareJWT, managger_project_middleware, ShowProyectoById, RemoveMemberToTeamRequest, remove_member_to_team);

export default router;