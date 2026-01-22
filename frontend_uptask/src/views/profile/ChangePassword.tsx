import {useForm} from "react-hook-form";
import type {FormChangePassword} from "../../types";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {changePasswordPUT} from "../../services/UsersService.ts";
import {useNavigate} from "react-router-dom";

export const ChangePassword = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<FormChangePassword>();
    function changePasswordLocal(data: FormChangePassword) {
        if (data.confirm_password !== data.new_password) {
            toast.error("Las passwords no coinciden");
            return;
        }
        changePasswordMutation.mutate(data);
    }

    const changePasswordMutation = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: changePasswordPUT,
        onSuccess: () => {
            toast.success("Password actualizada correctamente");
            navigate("/profile")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    return (
        <>
            <div className="mx-auto max-w-3xl font-varela">

                <h1 className="text-5xl font-black ">Cambiar Password</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu password</p>

                <form
                    onSubmit={handleSubmit(changePasswordLocal)}
                    className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="current_password"
                        >Password Actual</label>
                        <input
                            {...register("old_password", {
                                required: "El password actual es necesario"
                            })}
                            id="current_password"
                            type="password"
                            placeholder="Password Actual"
                            className="w-full px-3 py-2 rounded-xl  border border-gray-200"
                        />
                        <div className="bg-red-100 text-red-600 text-center mt-2 text-sm rounded-md font-semibold">
                            {errors.old_password && String(errors.old_password.message)}
                        </div>
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >Nuevo Password</label>
                        <input
                            {...register("new_password", {
                                required: "El nuevo password es necesario"
                            })}
                            id="password"
                            type="password"
                            placeholder="Nuevo Password"
                            className="w-full px-3 py-2  border border-gray-200"
                        />
                        <div className="bg-red-100 text-red-600 text-center mt-2 text-sm rounded-md font-semibold">
                            {errors.new_password && String(errors.new_password.message)}
                        </div>
                    </div>
                    <div className="mb-5 space-y-3">
                        <label
                            htmlFor="password_confirmation"
                            className="text-sm uppercase font-bold"
                        >Repetir Password</label>

                        <input
                            {...register("confirm_password", {
                                required: "La confirmacion de password es obligatoria"
                            })}
                            id="password_confirmation"
                            type="password"
                            placeholder="Repetir Password"
                            className="w-full px-3 py-2  border border-gray-200"
                        />
                        <div className="bg-red-100 text-red-600 text-center mt-2 text-sm rounded-md font-semibold">
                            {errors.confirm_password && String(errors.confirm_password.message)}
                        </div>
                    </div>

                    <input
                        type="submit"
                        value='Cambiar Password'
                        className="bg-fuchsia-600 w-full px-3 py-2 rounded-lg text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}