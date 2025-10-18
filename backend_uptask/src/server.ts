import express from "express";

const app = express();
import {conexionDB} from "./config/db";
import ProyectoRouter from "./routers/ProyectoRouter";
import TareaRouter from "./routers/TareaRouter";
import UserRouter from "./routers/UserRouter";
import cors from "cors";
import {corsConfig} from "./config/cors";
import EmpresaRouter from "./routers/EmpresaRouter";
import RolRouter from "./routers/RolRouter";

app.use(express.json());
conexionDB().then(() => {
    console.log("CONEXION CORRECTA A BASE DE DATOS")
}).catch((error) => {
    console.log(`ERROR EN CONEXION A BASE DE DATOS: ${error.message}`);
});

//Configuracion de cors
app.use(cors(corsConfig));

//Rutas de aplicacion
app.use("/proyectos", ProyectoRouter);
app.use("/tareas", TareaRouter);
app.use("/users", UserRouter);
app.use("/empresa", EmpresaRouter);
app.use("/roles", RolRouter);

export default app;