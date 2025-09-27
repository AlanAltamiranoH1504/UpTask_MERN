import express from "express";
import {confirm_user, create_user, prueba} from "../controllers/UserController";
import {ConfirmUserRequest, CreateUserRequest} from "../validators/UserValidators";

const router = express.Router();

router.get("/prueba", prueba);
router.post("/create_user", CreateUserRequest, create_user);
router.post("/confirm/:token", ConfirmUserRequest, confirm_user);

export default router;