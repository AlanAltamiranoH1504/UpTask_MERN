import {useForm} from "react-hook-form";
import type {FormCreateTarea} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {createTareaPOST} from "../../services/TareasService.ts";
import {toast} from "react-toastify";

const FormCreateTarea = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormCreateTarea>();
    const params = useParams();
    const navigate = useNavigate();

    function saveTarea(data: FormCreateTarea) {
        const idProyecto: string = params.id!;
        data.proyecto = idProyecto;
        data.status = "Pendiente";
        createTareaMutation.mutate(data);
    }

    const createTareaMutation = useMutation({
        mutationKey: ["createTarea"],
        mutationFn: createTareaPOST,
        onSuccess: () => {
            toast.success("Tarea creada correctamente");
            navigate("/");
        },
        onError: error => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    })

    return (
        <>
            <form className="mt-10 bg-white shadow p-10 rounded-lg space-y-5"
                  onSubmit={handleSubmit(saveTarea)}
            >
                <div className="space-y-2">
                    <label htmlFor={"nombre"} className="uppercase font-varela font-bold block">Nombre Tarea:</label>
                    <input
                        type="text"
                        placeholder="Nombre de la tarea"
                        className="border py-2 w-full rounded-lg border-gray-300 px-3"
                        {...register("nombre", {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 font-varela font-semibold rounded-md">
                        {errors.nombre && String(errors.nombre.message)}
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor={"descripcion"} className="uppercase font-varela font-bold block">Descripción de
                        Tarea:</label>
                    <textarea
                        className="border py-2 w-full rounded-lg border-gray-300 px-3"
                        placeholder="Descripcion de la tarea"
                        rows={5}
                        {...register("descripcion", {
                            required: "La descripción es obligatoria",
                        })}
                    ></textarea>
                    <div className="bg-red-100 text-center text-red-600 font-varela font-semibold rounded-md">
                        {errors.descripcion && String(errors.descripcion.message)}
                    </div>
                </div>
                <input type="submit" value="Agregar Tarea"
                       className="py-3 w-full rounded-lg border text-white text-lg font-varela font-semibold uppercase bg-purple-400 hover:bg-purple-500 transition-colors duration-500"/>
            </form>
        </>
    );
}
export default FormCreateTarea;