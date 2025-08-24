import Proyecto from "../models/Proyecto";

const saveProyecto = async (req, res) => {
    try {
        const proyectoToCreate = await Proyecto.create({
            nombreProyecto: req.body.nombreProyecto,
            nombreCliente: req.body.nombreCliente,
            descripcion: req.body.descripcion
        });
        return res.status(201).json({
            status: true,
            message: "Proyecto creado correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Ocurrio un error en la creación del proyecto",
            error: e.message
        });
    }
}
export {
    saveProyecto
}