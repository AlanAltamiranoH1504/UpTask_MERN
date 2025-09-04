import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./layouts/AppLayout.tsx";
import DashBoardView from "./views/DashBoardView.tsx";
import CreateProyectoView from "./views/proyectos/CreateProyectoView.tsx";
const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route path="/" element={<DashBoardView/>}></Route>

                        <Route path="/proyectos/creacion" element={<CreateProyectoView/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;