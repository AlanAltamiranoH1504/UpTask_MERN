import {Link} from "react-router-dom";
import FormCreateProyecto from "../../components/proyectos/FormCreateProyecto.tsx";

const CreateProyectoView = () => {
    return (
        <>
            <h1 className="text-5xl font-black font-varela">Nuevo Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

            <nav className="my-5">
                <Link to="/"
                      className="bg-purple-400 font-varela hover:bg-purple-500 transition-colors duration-500 px-10 py-3 text-white text-xl font-bold cursor-pointer rounded-lg">
                    Volver a Proyectos</Link>
            </nav>
            <div className="max-w-5xl mx-auto">


                <FormCreateProyecto/>
            </div>
        </>
    );
}
export default CreateProyectoView;