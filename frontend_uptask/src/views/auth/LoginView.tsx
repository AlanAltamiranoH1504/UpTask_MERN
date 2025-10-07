import {useForm} from "react-hook-form";
import type {FormLogin} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {loginUserPOST} from "../../services/UsersService.ts";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const LoginView = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormLogin>();

    function loginFunction(data: FormLogin) {
        loginUserMutation.mutate(data);
    }

    const loginUserMutation = useMutation({
        mutationKey: ["loginUser"],
        mutationFn: loginUserPOST,
        onSuccess: (data) => {
            toast.success("Login correcto");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    })

    return (
        <>
            <h2 className="my-10 text-3xl text-center font-varela font-semibold">Iniciar Sesion</h2>
            <form
                onSubmit={handleSubmit(loginFunction)}
                className="space-y-8 p-10 bg-white font-varela"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
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
                                message: "Formato de email no valido"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 font-semibold rounded-md">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full py-2 px-3 rounded-lg  border-gray-300 border"
                        {...register("password", {
                            required: "El password es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 font-semibold rounded-md">
                        {errors.password && String(errors.password.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full py-2 rounded-lg  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <div className="flex justify-around mt-5 font-semibold ">
                <Link to="/olvide-password">Olvide Password</Link>
                <Link to="/registro">Crear Cuenta</Link>
            </div>
        </>
    );
}
export default LoginView;