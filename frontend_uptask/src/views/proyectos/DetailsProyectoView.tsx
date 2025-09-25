import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findProyectoByIdGET} from "../../services/ProyectosService.ts";
import AddTaskModal from "../../components/tareas/AddTaskModal.tsx";
import TaskList from "../../components/tareas/TaskList.tsx";
import EditTaskData from "../../components/tareas/EditTaskData.tsx";

const DetailsProyectoView = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id!;

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["detailsProyectoById"],
        queryFn: () => findProyectoByIdGET(id),
        retry: false,
        refetchOnWindowFocus: false
    });
    if (isLoading) {
        return <div>Cargando...</div>
    }
    if (isError) {
        // @ts-ignore
        return <div className="text-center text-2xl font-varela font-semibold">{error.response.data.message}</div>;
    }

    if (data) return (
        <>
            <h1 className="text-5xl font-black font-varela">{data.proyecto.nombreProyecto}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.proyecto.descripcion}</p>

            <nav className="my-5 flex gap-3">
                <button type="button"
                        onClick={() => navigate("?newTask=true")}
                        className="bg-purple-400 hover:bg-purple-500 transition-colors rounded-lg font-bold duration-500 px-10 py-3 text-white text-xl cursor-pointer"
                >Agregar Tarea
                </button>
            </nav>
            <TaskList
                tareas={data.proyecto.tareas}
            />
            <AddTaskModal/>
            <EditTaskData/>
        </>
    );
}
export default DetailsProyectoView;