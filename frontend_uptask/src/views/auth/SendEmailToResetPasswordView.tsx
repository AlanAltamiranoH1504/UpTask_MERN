import {useForm} from "react-hook-form";
import type {FormResetPassword} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {resetPasswordPOST} from "../../services/UsersService.ts";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

const SendEmailToResetPasswordView = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormResetPassword>();
    const navigate = useNavigate();

    function resetPasswordFunction(data: FormResetPassword) {
        resetPasswordMutation.mutate(data);
    }

    const resetPasswordMutation = useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: resetPasswordPOST,
        onSuccess: (data) => {
            toast.success(data!.message);
            navigate("/login");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    });

    return (
        <>
            <h1 className="text-5xl font-black text-black font-varela">Recuperar Contraseña</h1>
            <p className="text-2xl font-light text-black font-varela my-5">
                Recupera tu cuenta y Administra tus Proyectos en {''}
                <span className=" text-fuchsia-500 font-bold"> UpTask</span>
            </p>
            <form
                className="space-y-8 p-10  bg-white font-varela"
                noValidate
                onSubmit={handleSubmit(resetPasswordFunction)}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full py-2 px-3 rounded-lg  border-gray-300 border"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El formato del email no es valido"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 font-semibold font-varela rounded-md">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full py-2 px-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <div className="flex justify-around mt-5 font-semibold ">
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/registro">Crear Cuenta</Link>
            </div>
        </>
    );
}
export default SendEmailToResetPasswordView;