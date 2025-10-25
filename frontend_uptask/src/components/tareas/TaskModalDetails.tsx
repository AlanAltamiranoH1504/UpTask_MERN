import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {findTareaaByIdGET, updateStatusTaskPUT} from "../../services/TareasService.ts";
import {adminValidation, dateFormat} from "../../utils";
import {useForm} from "react-hook-form";
import type {FormEditStatusTarea, UserInSession} from "../../types";
import {toast} from "react-toastify";

export default function TaskModalDetails() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryClient = useQueryClient();
    const idTask = queryParams.get("showTask")!;
    const show = !!idTask;
    const navigate = useNavigate();

    const {data} = useQuery({
        queryKey: ["showDetailsTask"],
        queryFn: () => findTareaaByIdGET(idTask),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!idTask,
    });

    const cacheUserInSession: UserInSession = queryClient.getQueryData(["showUser"])!;
    const cacheProjectDetails = queryClient.getQueryData(["detailsProyectoById"])!;
    // @ts-ignore
    const validation_manager = adminValidation(cacheUserInSession.user._id, cacheProjectDetails.proyecto.usuario);


    const {register, handleSubmit, formState: {errors}} = useForm<FormEditStatusTarea>();

    function updateStatusTask(data: FormEditStatusTarea) {
        data._id = idTask;
        updaeStatusTaskMutation.mutate(data);
    }

    const updaeStatusTaskMutation = useMutation({
        mutationKey: ["updateStatusTask"],
        mutationFn: updateStatusTaskPUT,
        onSuccess: () => {
            toast.success("Tarea actualizada correctamente");
            queryClient.invalidateQueries({
                queryKey: ["detailsProyectoById"]
            });
            navigate(window.location.pathname, {replace: true});
        },
        onError: (e) => {
            // @ts-ignore
            toast.error(e.response.data.message)
        }
    });

    const estados: string[] = [
        "Pendiente",
        "En progreso",
        "En espera",
        "Revisando",
        "Completada",
        "Final"
    ];

    if (data)
        return (
            <>
                <Transition appear show={show} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => {
                            navigate(window.location.pathname, {replace: true});
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/60"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto font-varela">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                        <p className="text-sm text-slate-400">
                                            Agregada el: {dateFormat(data.tarea.createdAt)}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            Última actualización: {dateFormat(data.tarea.updatedAt)}
                                        </p>
                                        <Dialog.Title
                                            as="h3"
                                            className="font-black text-4xl text-slate-600 my-5"
                                        >
                                            {data.tarea.nombre}
                                        </Dialog.Title>
                                        <p className="text-lg text-slate-500 mb-2">
                                            Descripción: {data.tarea.descripcion}
                                        </p>
                                        {validation_manager && (
                                            <>
                                                <div className="my-5 space-y-3">
                                                    <form
                                                        onSubmit={handleSubmit(updateStatusTask)}
                                                    >
                                                        <label className="font-bold">
                                                            Estado Actual: {data.tarea.status}
                                                        </label>
                                                        <select
                                                            className="w-full p-3 bg-gray-50 border rounded-lg shadow"
                                                            {...register("status", {
                                                                required: "El estado de la tarea es obligatorio"
                                                            })}
                                                        >
                                                            {estados.map((estado) => (
                                                                <option selected={data.tarea.status === estado}
                                                                        value={estado}
                                                                        key={estado}>{estado}</option>
                                                            ))}
                                                        </select>
                                                        <div
                                                            className="bg-red-100 text-center text-red-600 font-semibold rounded-md">
                                                            {errors.status && String(errors.status.message)}
                                                        </div>

                                                        <input type="submit"
                                                               className=" mt-4 border py-2 rounded-lg bg-purple-400 px-3 font-bold text-white font-varela hover:bg-purple-500 transition-colors duration-500 cursor-pointer"
                                                               value="Actualizar Estado"/>
                                                    </form>
                                                </div>
                                            </>
                                        )}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        );
}
