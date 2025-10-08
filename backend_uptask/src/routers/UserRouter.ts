import express from "express";
import {
    confirm_user,
    create_user,
    login_user,
    prueba,
    reset_password,
    send_email_reset_password
} from "../controllers/UserController";
import {
    ConfirmUserRequest,
    CreateUserRequest,
    LoginRequest, ResetPasswordRequest,
    SendEmailResetPasswordRequest
} from "../validators/UserValidators";

const router = express.Router();

router.get("/prueba", prueba);
router.post("/create_user", CreateUserRequest, create_user);
router.post("/confirm/:token", ConfirmUserRequest, confirm_user);
router.post("/login", LoginRequest, login_user);
router.post("/send_email_reset_password", SendEmailResetPasswordRequest, send_email_reset_password);
router.post("/reset_password", ResetPasswordRequest, reset_password);

export default router;