import {useForm} from "react-hook-form";
import type {FormSaveNewPassword} from "../../types";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {saveNewPasswordPOST} from "../../services/UsersService.ts";
import {useNavigate, useParams} from "react-router-dom";

const ResetPasswordView = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormSaveNewPassword>();
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token!;

    function saveNewPassword(data: FormSaveNewPassword) {
        if (data.confrm_password !== data.new_password) {
            toast.info("Las contraseñas son diferentes");
            return;
        }
        const newData = {
            ...data,
            token: token
        }
        saveNewPasswordMutation.mutate(newData);
    }

    const saveNewPasswordMutation = useMutation({
        mutationKey: ["saveNewPassword"],
        mutationFn: saveNewPasswordPOST,
        onSuccess: (data) => {
            toast.success(data!.message);
            navigate("/login");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    })
    return (
        <>
            <h1 className="text-5xl font-black text-black font-varela">Actualiza tu Password</h1>
            <p className="text-2xl font-light text-black font-varela mt-5">
                Actualiza tu Password y continua usuando {''}
                <span className=" text-fuchsia-500 font-bold"> UpTask</span>
            </p>
            <form
                className="space-y-8 p-10  bg-white mt-10 font-varela"
                noValidate
                onSubmit={handleSubmit(saveNewPassword)}
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full py-3 px-2 rounded-lg  border-gray-300 border"
                        {...register("new_password", {
                            required: "El password es obliigatorio",
                            minLength: {
                                value: 5,
                                message: "El password debe tener al menos 5 caracteres"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center rounded-md font-varela">
                        {errors.new_password && String(errors.new_password.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full py-3 px-2 rounded-lg  border-gray-300 border"
                        {...register("confrm_password", {
                            required: "La confirmacion de password es obliigatoria",
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center rounded-md font-varela">
                        {errors.confrm_password && String(errors.confrm_password.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full py-2 rounded-lg  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    );
}
export default ResetPasswordView;