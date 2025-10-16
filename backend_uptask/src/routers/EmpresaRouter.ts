import express from "express";
import {EmpresaController} from "../controllers/EmpresaCotroller";
import {CreateEmpresaRequest, FindEmpresaRequest} from "../validators/EmpresaValidators";

const router = express.Router();
const empresaController = new EmpresaController();

router.get("/prueba", empresaController.prueba);
router.post("/save_empresa", CreateEmpresaRequest, empresaController.save_empresa);
router.get("/find_empresa/:id", FindEmpresaRequest, empresaController.find_empresa);
router.delete("/delete_empresa/:id", FindEmpresaRequest, empresaController.delete_empresa);

export default router;