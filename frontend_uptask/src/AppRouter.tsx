import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./layouts/AppLayout.tsx";
import DashBoardView from "./views/DashBoardView.tsx";
import CreateProyectoView from "./views/proyectos/CreateProyectoView.tsx";
import EditProyectoView from "./views/proyectos/EditProyectoView.tsx";
import DetailsProyectoView from "./views/proyectos/DetailsProyectoView.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import ConfirUserView from "./views/auth/ConfirUserView.tsx";
import LoginView from "./views/auth/LoginView.tsx";
import RegisterView from "./views/auth/RegisterView.tsx";
import SendEmailToResetPasswordView from "./views/auth/SendEmailToResetPasswordView.tsx";
import ResetPasswordView from "./views/auth/ResetPasswordView.tsx";
import TeamMembers from "./views/proyectos/TeamMembers.tsx";
import {ProfileView} from "./views/profile/ProfileView.tsx";
import {ChangePassword} from "./views/profile/ChangePassword.tsx";
import {ProfileLayout} from "./layouts/ProfileLayout.tsx";
const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route path="/" element={<DashBoardView/>}></Route>

                        <Route path="/proyectos/creacion" element={<CreateProyectoView/>}></Route>
                        <Route path="/proyectos/edicion/:id" element={<EditProyectoView/>}></Route>
                        <Route path="/proyectos/:id" element={<DetailsProyectoView/>}></Route>
                        <Route path="/proyectos/:id/equipo" element={<TeamMembers/>}></Route>

                        <Route element={<ProfileLayout/>}>
                            <Route path="/profile" element={<ProfileView/>}></Route>
                            <Route path="/profile/password" element={<ChangePassword/>}></Route>
                        </Route>
                    </Route>

                    <Route element={<AuthLayout/>}>
                        <Route path="/auth/confirmar/:token" element={<ConfirUserView/>}></Route>
                        <Route path="/login" element={<LoginView/>}></Route>
                        <Route path="/registro" element={<RegisterView/>}></Route>
                        <Route path="/olvide-password" element={<SendEmailToResetPasswordView/>}></Route>
                        <Route path="/auth/olvide-password/:token" element={<ResetPasswordView/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;