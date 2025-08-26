import express from "express";
const app = express();
import {conexionDB} from "./config/db";
import ProyectoRouter from "./routers/ProyectoRouter";
import TareaRouter from "./routers/TareaRouter";

app.use(express.json());
conexionDB();

//Rutas de aplicacion
app.use("/proyectos", ProyectoRouter);
app.use("/tareas", TareaRouter);

export default app;