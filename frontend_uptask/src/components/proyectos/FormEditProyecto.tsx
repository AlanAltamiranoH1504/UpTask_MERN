import type {FindProyectoById, FormEditarProyectoType} from "../../types";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {updateProyectoByIdPUT} from "../../services/ProyectosService.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

type FormEditProyectoProps = {
    proyecto: FindProyectoById
}
const FormEditProyecto = ({proyecto}: FormEditProyectoProps) => {
    const navgate = useNavigate();
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormEditarProyectoType>();

    function updateProyectoFunction(data: FormEditarProyectoType) {
        const fullProyecto = {
            ...data,
            id: proyecto.proyecto._id
        };
        updateProyectoMutation.mutate(fullProyecto);
    }

    const updateProyectoMutation = useMutation({
        mutationKey: ["updateProyectoById"],
        mutationFn: updateProyectoByIdPUT,
        onError: (error) => {
            toast.error("Ocurrio un error en la actualización");
            // @ts-ignore
            toast.error(error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Proyecto actualizado correctamente");
            navgate("/");
        }
    })

    useEffect(() => {
        reset({
            nombreProyecto: proyecto.proyecto.nombreProyecto,
            nombreCliente: proyecto.proyecto.nombreCliente,
            descripcion: proyecto.proyecto.descripcion
        })
    }, [proyecto]);

    return (
        <>
            <form className="mt-10 bg-white shadow p-10 rounded-lg space-y-5"
                  onSubmit={handleSubmit(updateProyectoFunction)}
                  noValidate={true}
            >
                <div className="space-y-2">
                    <label htmlFor="nombreProyecto" className="uppercase font-varela font-bold block">Nombre del
                        Proyecto</label>
                    <input type="text"
                           className="w-full border rounded-lg px-3 py-3 font-varela border-gray-200 shadow"
                           placeholder="Nombre del proyecto"
                           {...register("nombreProyecto", {
                               required: "El nombre del proyecto es obligatorio"
                           })}
                    />
                    <div className="bg-red-100 text-center font-varela font-semibold mt-1 text-red-600 rounded-sm">
                        {errors.nombreProyecto && String(errors.nombreProyecto.message)}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="nombreCliente" className="uppercase font-varela font-bold block">Nombre del
                        Cliente</label>
                    <input type="text"
                           className="w-full border rounded-lg px-3 py-3 font-varela border-gray-200 shadow"
                           placeholder="Nombre del Cliente"
                           {...register("nombreCliente", {
                               required: "El nombre del cliente es obligatorio"
                           })}
                    />
                    <div className="bg-red-100 text-center font-varela font-semibold mt-1 text-red-600 rounded-sm">
                        {errors.nombreCliente && String(errors.nombreCliente.message)}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="descripcion" className="uppercase font-varela font-bold block">Descripción</label>
                    <textarea
                        className="w-full border rounded-lg px-3 py-3 font-varela border-gray-200 shadow"
                        placeholder="Descripción del proyecto" rows={8}
                        {...register("descripcion", {
                            required: "La descripción es obligatoria"
                        })}
                    ></textarea>
                    <div className="bg-red-100 text-center font-varela font-semibold mt-1 text-red-600 rounded-sm">
                        {errors.descripcion && String(errors.descripcion.message)}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="status" className="uppercase font-varela font-bold block">Status</label>
                    <select className="w-full border p-2 rounded-lg font-varela"
                            {...register("status", {
                                validate: (v) => v !== undefined && v !== null ? true : "El estado es obligatorio",
                                setValueAs: (v) => v === "true",
                            })}
                    >
                        <option value="">--- Selecciona una opción ---</option>
                        <option value="true">Habilitado</option>
                        <option value="false">Dehabilitado</option>
                    </select>
                    <div className="bg-red-100 text-center font-varela font-semibold mt-1 text-red-600 rounded-sm">
                        {errors.status && String(errors.status.message)}
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <input type="submit" value="Actualizar Proyecto"
                           className="px-20 rounded-lg  text-xl cursor-pointer py-3 bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors duration-500 text-white font-varela font-bold"/>
                </div>
            </form>
        </>
    );
}
export default FormEditProyecto;