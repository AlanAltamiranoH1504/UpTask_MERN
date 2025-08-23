import server from "./server";
import dotenv from "dotenv";

dotenv.config();

//Despliegue de puerto de servidor
server.listen(process.env.BACKEND_PORT || 3001, () => {
    console.log(`Aplicacion arrancada en puerto: ${process.env.BACKEND_PORT}`);
});