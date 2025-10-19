import express from "express";
import {RolController} from "../controllers/RolController";
import {CreateRolRequest, DeleteRolRequest, TypesRolesRequest} from "../validators/RolValidators";
import multer from "multer";

const router = express.Router();

const roController = new RolController();
const upload = multer({dest: "uploads/"});

router.get("/prueba", roController.prueba);
router.get("/types_roles", TypesRolesRequest, roController.types_roles);
router.post("/create_rol", CreateRolRequest, roController.create_rol);
router.post("/save_rols", upload.single("file"), roController.save_rols);
router.delete("/delete_rol", DeleteRolRequest, roController.delete_rol);

export default router;