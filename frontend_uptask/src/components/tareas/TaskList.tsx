import type {TareaDB} from "../../types";
import TaskCard from "./TaskCard.tsx";

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

const statusStyles : {[key: string]: string} = {
    Pendiente: "border-t-slate-500",
    "En progreso": "border-t-red-500",
    "En espera": "border-t-blue-500",
    Revisando: "border-t-amber-500",
    Completada: "border-t-emerald-500"
}

const TaskList = ({tareas}: TaskListProps) => {
    const groupedTasks = tareas.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    return (
        <>
            <h2 className="text-5xl font-black my-10 font-varela font-bold">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 font-varela'>
                {Object.entries(groupedTasks).map(([status, task]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white py-3 border-t-8 text-center ${statusStyles[status]}`}>{status}</h3>
                        <ul className='mt-5 space-y-5'>
                            {task.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                task.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
export default TaskList;