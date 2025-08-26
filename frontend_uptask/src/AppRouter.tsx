import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginView from "./views/auth/LoginView.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route path="/" element={<LoginView/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;