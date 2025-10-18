import {useForm} from "react-hook-form";
import type {FormRegisterUser} from "../../types";
import {useMutation, useQuery} from "@tanstack/react-query";
import {registerUserPOST} from "../../services/UsersService.ts";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {findAllEmpresasGET} from "../../services/EmpresaService.ts";

const RegisterView = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormRegisterUser>();
    const navigate = useNavigate();

    const {data, isLoading, isError} = useQuery({
        queryKey: ["findAllEmpresas"],
        queryFn: () => findAllEmpresasGET(),
        retry: false,
        refetchOnWindowFocus: false
    });

    function registerFunction(data: FormRegisterUser) {
        registerUserMutation.mutate(data);
    }

    const registerUserMutation = useMutation({
        mutationKey: ["registerUser"],
        mutationFn: registerUserPOST,
        onSuccess: () => {
            toast.success("Usuario registrado. Confirma tu cuenta y espera que te confime tu empresa");
            navigate("/login");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    });

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (isError) {
        return <div>Error en busqueda de empresas</div>
    }


    return (
        <>
            <h1 className="text-5xl font-black text-black font-varela">Crear Cuenta</h1>
            <p className="text-2xl font-light text-black font-varela mt-5">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                className="space-y-8 p-10  bg-white mt-10 font-varela"
                noValidate
                onSubmit={handleSubmit(registerFunction)}
            >
                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full py-2 px-3 rounded-lg border-gray-300 border"
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

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full py-2 px-3 rounded-lg  border-gray-300 border"
                        {...register("nombre", {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 font-semibold rounded-md">
                        {errors.nombre && String(errors.nombre.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                    >Apellidos</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full py-2 px-3 rounded-lg  border-gray-300 border"
                        {...register("apellidos", {
                            required: "Los apellidos son obligatorios"
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 font-semibold rounded-md">
                        {errors.apellidos && String(errors.apellidos.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full py-2 px-3 rounded-lg  border-gray-300 border"
                        {...register("password", {
                            required: "El password es obbligatorio",
                            minLength: {
                                value: 6,
                                message: "El password debe tener al menos 6 caracteres"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 font-semibold rounded-md">
                        {errors.password && String(errors.password.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                    >Empresa</label>

                    <select
                        className="w-full py-2 px-3 rounded-lg  border-gray-300 border"
                        {...register("empresa", {
                            required: "La empresa es obligatoria"
                        })}
                    >
                        <option>--- Selecciona la empresa a la que perteneces ---</option>
                        {data?.empresas.map((empresa) => {
                            return (
                                <option key={empresa._id} value={empresa._id}>{empresa.nombre} - {empresa.email}</option>
                            )
                        })}
                    </select>
                    <div className="bg-red-100 text-center text-red-600 font-semibold rounded-md">
                        {errors.empresa && String(errors.empresa.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full py-2 px-3 rounded-lg  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <div className="flex justify-around mt-5 font-semibold ">
                <Link to="/olvide-password">Olvide Password</Link>
                <Link to="/login">Iniciar Sesión</Link>
            </div>

        </>
    );
}
export default RegisterView;