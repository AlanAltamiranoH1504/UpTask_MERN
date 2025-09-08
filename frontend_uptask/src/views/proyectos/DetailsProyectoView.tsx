import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findProyectoByIdGET} from "../../services/ProyectosService.ts";
import AddTaskModal from "../../components/tareas/AddTaskModal.tsx";

const DetailsProyectoView = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id!;

    const {data, isLoading, isError} = useQuery({
        queryKey: ["detailsProyectoById"],
        queryFn: () => findProyectoByIdGET(id),
        retry: false,
        refetchOnWindowFocus: false
    });
    if (isLoading) {
        return <div>Cargando...</div>
    }
    if (isError) {
        return <div>Ocurrio un error en la busqueda</div>;
    }

    if (data) return (
        <>
            <h1 className="text-5xl font-black font-varela">{data.proyecto.nombreProyecto}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.proyecto.descripcion}</p>

            <nav className="my-5 flex gap-3">
                <button type="button"
                        onClick={() => navigate("?newTask=true")}
                    className="bg-purple-400 hover:bg-purple-500 transition-colors rounded-lg font-bold duration-500 px-10 py-3 text-white text-xl cursor-pointer"
                >Agregar Tarea</button>
            </nav>
            <AddTaskModal/>
        </>
    );
}
export default DetailsProyectoView;