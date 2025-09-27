import express from "express";
import {create_user, prueba} from "../controllers/UserController";
import {CreateUserRequest} from "../validators/UserValidators";

const router = express.Router();

router.get("/prueba", prueba);
router.post("/create_user", CreateUserRequest, create_user);

export default router;