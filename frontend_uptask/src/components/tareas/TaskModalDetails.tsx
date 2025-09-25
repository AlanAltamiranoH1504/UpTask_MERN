import {Fragment} from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from '@headlessui/react';
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findTareaaByIdGET} from "../../services/TareasService.ts";
import {dateFormat} from "../../utils";

export default function TaskModalDetails() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idTask = queryParams.get("showTask")!;
    const show = !!idTask;
    const navigate = useNavigate();

    const {data} = useQuery({
        queryKey: ["showDetailsTask"],
        queryFn: () => findTareaaByIdGET(idTask),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!idTask
    });
    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {
                    navigate(window.location.pathname, {replace: true});
                }}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60"/>
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel
                                    className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {dateFormat(data.tarea.createdAt)} </p>
                                    <p className='text-sm text-slate-400'>Última actualización: {dateFormat(data.tarea.updatedAt)} </p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.tarea.nombre}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.tarea.descripcion}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: {data.tarea.status}</label>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}