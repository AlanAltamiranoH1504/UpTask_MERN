import express from "express";
const app = express();
import {conexionDB} from "./config/db";
import ProyectoRouter from "./routers/ProyectoRouter";
import TareaRouter from "./routers/TareaRouter";
import cors from "cors";
import {corsConfig} from "./config/cors";

app.use(express.json());
conexionDB();

//Configuracion de cors
app.use(cors(corsConfig));

//Rutas de aplicacion
app.use("/proyectos", ProyectoRouter);
app.use("/tareas", TareaRouter);

export default app;