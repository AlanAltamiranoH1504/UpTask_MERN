import express from "express";
import {
    confirm_user,
    create_user, edit_profile,
    login_user, logout_user,
    prueba,
    reset_password,
    send_email_reset_password, show_user, update_password, verify_password
} from "../controllers/UserController";
import {
    ConfirmUserRequest,
    CreateUserRequest, EditProfileRequest,
    LoginRequest, ResetPasswordRequest,
    SendEmailResetPasswordRequest, UpdatePasswordRequest, VerifyPasswordRequest
} from "../validators/UserValidators";
import {middlewareJWT} from "../middlewares/middlewareJWT";

const router = express.Router();

router.get("/prueba", middlewareJWT, prueba);
router.post("/create_user", CreateUserRequest, create_user);
router.get("/show_user", middlewareJWT, show_user);
router.put("/edit_profile", middlewareJWT, EditProfileRequest, edit_profile);
router.put("/update_password", middlewareJWT, UpdatePasswordRequest, update_password);
router.post("/verify_password", middlewareJWT, VerifyPasswordRequest, verify_password);
router.post("/confirm/:token", ConfirmUserRequest, confirm_user);
router.post("/login", LoginRequest, login_user);
router.post("/send_email_reset_password", SendEmailResetPasswordRequest, send_email_reset_password);
router.post("/reset_password", ResetPasswordRequest, reset_password);
router.get("/logout_user", logout_user);

export default router;