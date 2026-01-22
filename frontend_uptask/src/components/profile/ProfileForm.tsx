import {useForm} from "react-hook-form";
import type {FormEditProfile} from "../../types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {editProfilePUT, showUserGET} from "../../services/UsersService.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";

export const ProfileForm = () => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<FormEditProfile>();
    const queryClient = useQueryClient();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["showUserInSession"],
        queryFn: showUserGET,
        retry: false,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (data) {
            setValue("email", data.user.email);
            setValue("nombre", data.user.nombre);
            setValue("apellidos", data.user.apellidos);
            setValue("rol", data.user.rol.nombre);
        }
    });

    function editProfileLocal(data: FormEditProfile) {
        editProfileMutation.mutate(data);
    }

    const editProfileMutation = useMutation({
        mutationKey: ["editProfile"],
        mutationFn: editProfilePUT,
        onSuccess: () => {
            toast.success("Usuario actualizado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["showUserInSession"]
            })
        }
    });

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (isError) {
        return <div>{error.message}</div>;
    }

    return (
        <>
            <div className="mx-auto max-w-3xl font-varela">
                <h1 className="text-5xl font-black font-varela">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                    onSubmit={handleSubmit(editProfileLocal)}
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            {...register("nombre", {
                                required: "El nombre es obligatorio"
                            })}
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full px-3 py-2 rounded-xl  border border-gray-200"
                        />
                        <div className="bg-red-100 text-red-600 text-center mt-2 text-sm rounded-md font-semibold">
                            {errors.nombre && String(errors.nombre.message)}
                        </div>
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Apellidos</label>
                        <input
                            {...register("apellidos", {
                                required: "Los apellidos son obligatorios"
                            })}
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full px-3 py-2 rounded-xl  border border-gray-200"
                        />
                        <div className="bg-red-100 text-red-600 text-center mt-2 text-sm rounded-md font-semibold">
                            {errors.apellidos && String(errors.apellidos.message)}
                        </div>
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Formato de email no valido"
                                }
                            })}

                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full px-3 py-2 rounded-xl  border border-gray-200"
                        />
                        <div className="bg-red-100 text-red-600 text-center mt-2 text-sm rounded-md font-semibold">
                            {errors.email && String(errors.email.message)}
                        </div>
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >Rol</label>
                        <input
                            {...register("rol", {
                                required: "El email es obligatorio"
                            })}
                            readOnly={true}
                            className="w-full px-3 py-2 rounded-xl  border border-gray-200"
                        />
                    </div>

                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full px-3 py-2 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}