import type {FormEditStatusTarea, TareaDB} from "../../types";
import TaskCard from "./TaskCard.tsx";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";
import {DropTask} from "./DropTask.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateStatusTaskPUT} from "../../services/TareasService.ts";
import {toast} from "react-toastify";

type TaskListProps = {
    tareas: TareaDB[]
}
type GroupedTask = {
    [key: string]: TareaDB[]
}
const initialStatusGroups: GroupedTask = {
    Pendiente: [],
    "En progreso": [],
    "En espera": [],
    Revisando: [],
    Completada: []
}

const statusStyles: { [key: string]: string } = {
    Pendiente: "border-t-slate-500",
    "En progreso": "border-t-red-500",
    "En espera": "border-t-blue-500",
    Revisando: "border-t-amber-500",
    Completada: "border-t-emerald-500"
}

const TaskList = ({tareas}: TaskListProps) => {
    const queryClient = useQueryClient();
    const groupedTasks = tareas.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task];
        return {...acc, [task.status]: currentGroup};
    }, initialStatusGroups);

    const handleDragEnd = (e: DragEndEvent) => {
        const {over, active} = e;

        if (over && over.id) {
            const status = over.id;
            const id_task = active.id;
            const data: FormEditStatusTarea = {
                _id: id_task,
                status: status
            }
            editStatusTaskMutation.mutate(data);
        } else {
            toast.error("Arrastra al área punteada")
        }
    }

    const editStatusTaskMutation = useMutation({
        mutationKey: ["editStatusTask"],
        mutationFn: updateStatusTaskPUT,
        onSuccess: () => {
            toast.success("Tarea actualizada correctamente");
            queryClient.invalidateQueries({
                queryKey: ["detailsProyectoById"]
            })
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return (
        <>
            <h2 className="text-5xl font-black my-10 font-varela font-bold">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 font-varela'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, task]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white py-3 border-t-8 text-center ${statusStyles[status]}`}>{status}</h3>

                            <DropTask
                                status={status}
                            />
                            <ul className='mt-5 space-y-5'>
                                {task.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    task.map(task => <TaskCard key={task._id} task={task}/>)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    );
}
export default TaskList;