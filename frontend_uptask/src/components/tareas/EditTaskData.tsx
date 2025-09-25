import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findTareaaByIdGET} from "../../services/TareasService.ts";
import EditTaskModal from "./EditTaskModal.tsx";

const EditTaskData = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idTask = queryParams.get("tareaId")!;

    const {data} = useQuery({
        queryKey: ["findTareaById"],
        queryFn: () => findTareaaByIdGET(idTask),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!idTask
    });

    if (data) return <EditTaskModal show={!!idTask} tarea={data.tarea}/>
}
export default EditTaskData;