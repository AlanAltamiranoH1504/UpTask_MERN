import express from "express";
const app = express();
import {conexionDB} from "./config/db";
import ProyectoRouter from "./routers/ProyectoRouter";

app.use(express.json());
conexionDB();

//Rutas de aplicacion
app.use("/proyectos", ProyectoRouter);

export default app;