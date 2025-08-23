import express from "express";
const app = express();
import {conexionDB} from "./config/db";

app.use(express.json());
conexionDB();

export default app;