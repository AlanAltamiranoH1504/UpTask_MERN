import express from "express";
import {EmpresaController} from "../controllers/EmpresaCotroller";
import {ConfirmCollaboratonRequest, CreateEmpresaRequest, FindEmpresaRequest} from "../validators/EmpresaValidators";

const router = express.Router();
const empresaController = new EmpresaController();

router.get("/prueba", empresaController.prueba);
router.post("/save_empresa", CreateEmpresaRequest, empresaController.save_empresa);
router.get("/types_empresa", empresaController.types_empresa);
router.post("/confirm_user", ConfirmCollaboratonRequest, empresaController.confirm_user);
router.get("/find_empresa/:id", FindEmpresaRequest, empresaController.find_empresa);
router.delete("/delete_empresa/:id", FindEmpresaRequest, empresaController.delete_empresa);

// TODO: NECESITO EL PANEL DE ADMINISTRACION DE LA EMPRESA
// TODO: DONDE HAGA LOGIN, VEA SUS ROLES Y SUS EMPLEADOS, Y PUEDA CONFIRMARLOS
export default router;