import { Dialog, Transition } from "@headlessui/react";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Fragment} from "react";
import {useForm} from "react-hook-form";
import type {FormVerifyPassword} from "../../types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {verifyPasswordPOST} from "../../services/UsersService.ts";
import {toast} from "react-toastify";
import {deleteProyectoDELETE} from "../../services/ProyectosService.ts";

export const DeleteProjectModal = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormVerifyPassword>();
    const queryCliente = useQueryClient();
    const location = useLocation()
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false;

    function verifyPassword(data: FormVerifyPassword) {
        verifyPasswordMutation.mutate(data);
    }

    const verifyPasswordMutation = useMutation({
        mutationKey: ["verifyPassword"],
        mutationFn: verifyPasswordPOST,
        onError: () => {
            toast.error("Password incorrecta");
        },
        onSuccess: (data) => {
            deleteProyectoMutation.mutate(deleteProjectId);
        }
    });

    const deleteProyectoMutation = useMutation({
        mutationKey: ["deleteProyectoById"],
        mutationFn: deleteProyectoDELETE,
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Proyecto eliminado correctamente");
            queryCliente.invalidateQueries({
                queryKey: ["findAllProyectos"]
            });
        }
    })

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">

                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >Eliminar Proyecto </Dialog.Title>

                                    <p className="text-xl font-bold">Confirma la eliminación del proyecto {''}
                                        <span className="text-fuchsia-600">colocando tu password</span>
                                    </p>

                                    <form
                                        className="mt-10 space-y-5"
                                        noValidate
                                        onSubmit={handleSubmit(verifyPassword)}
                                    >

                                        <div className="flex flex-col gap-3">
                                            <label
                                                className="font-normal text-2xl"
                                                htmlFor="password"
                                            >Password</label>
                                            <input
                                                {...register("password", {
                                                    required: "La password es obligatoria"
                                                })}
                                                id="password"
                                                type="password"
                                                placeholder="Password Inicio de Sesión"
                                                className="w-full px-3 py-2 rounded-lg  border-gray-300 border"
                                            />
                                            <div className="bg-red-100 text-center text-red-600 rounded-md font-semibold">
                                                {errors.password && String(errors.password.message)}
                                            </div>
                                        </div>

                                        <input
                                            type="submit"
                                            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full px-3 py-2  text-white font-black  text-xl cursor-pointer"
                                            value='Eliminar Proyecto'
                                        />
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}