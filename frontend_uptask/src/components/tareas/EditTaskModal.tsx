import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {Fragment, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import type {FormEditTarea} from "../../types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateTareaByIdPUT} from "../../services/TareasService.ts";
import {toast} from "react-toastify";

type EditTaskModalProps = {
    show: boolean;
    tarea?: {
        _id: string;
        nombre: string;
        descripcion: string;
        proyecto: {
            _id: string;
            nombreProyecto: string;
            nombreCliente: string;
            descripcion: string;
        };
        status: string;
    }
}

const EditTaskModal = ({tarea, show}: EditTaskModalProps) => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormEditTarea>();
    const queryClient = useQueryClient();
    useEffect(() => {
        if (tarea) {
            reset({
                nombre: tarea.nombre,
                descripcion: tarea.descripcion
            });
        }
    }, [tarea]);

    function updateTareaPeticion(data: FormEditTarea) {
        data.status = tarea!.status;
        data._id = tarea!._id;
        updateTareaMutation.mutate(data);
    }

    const updateTareaMutation = useMutation({
        mutationKey: ["updateTareaById"],
        mutationFn: updateTareaByIdPUT,
        onSuccess: () => {
            toast.success("Tarea actualizada correctamente");
            queryClient.invalidateQueries({
                queryKey: ["detailsProyectoById"]
            });
            show = !show;
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    })

    return (
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
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Editar Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                        <span className="text-fuchsia-600">este formulario</span>
                                    </p>

                                    <form
                                        className="mt-10 space-y-3"
                                        noValidate
                                        onSubmit={handleSubmit(updateTareaPeticion)}
                                    >
                                        <div className="space-y-2">
                                            <label htmlFor={"nombre"} className="uppercase font-varela font-bold block">Nombre
                                                Tarea:</label>
                                            <input
                                                type="text"
                                                placeholder="Nombre de la tarea"
                                                className="border py-2 w-full rounded-lg border-gray-300 px-3"
                                                {...register("nombre", {
                                                    required: "El nombre de la tarea es obligatorio"
                                                })}
                                            />
                                            <div
                                                className="bg-red-100 text-center text-red-600 font-varela font-semibold rounded-md">
                                                {errors.nombre && String(errors.nombre.message)}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor={"descripcion"}
                                                   className="uppercase font-varela font-bold block">Descripción de
                                                Tarea:</label>
                                            <textarea
                                                className="border py-2 w-full rounded-lg border-gray-300 px-3"
                                                placeholder="Descripcion de la tarea"
                                                rows={5}
                                                {...register("descripcion", {
                                                    required: "La descripcion de la tarea es obligatoria"
                                                })}
                                            ></textarea>
                                            <div
                                                className="bg-red-100 text-center text-red-600 font-varela font-semibold rounded-md">
                                                {errors.descripcion && String(errors.descripcion.message)}
                                            </div>
                                        </div>

                                        <input
                                            type="submit"
                                            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                            value='Guardar Tarea'
                                        />
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
export default EditTaskModal;