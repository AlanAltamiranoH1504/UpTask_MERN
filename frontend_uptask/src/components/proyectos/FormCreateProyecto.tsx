import {useForm} from "react-hook-form";
import type {FormCreateProyectoType} from "../../types";

const FormCreateProyecto = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormCreateProyectoType>();
    function saveProyectoFunction(data: FormCreateProyectoType) {
        console.log(data)
    }
    return (
        <>
            <form className="mt-10 bg-white shadow p-10 rounded-lg space-y-5"
                  onSubmit={handleSubmit(saveProyectoFunction)}
                  noValidate={true}
            >
                <div className="space-y-2">
                    <label htmlFor="nombreProyecto" className="uppercase font-varela font-bold block">Nombre del Proyecto</label>
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
                    <label htmlFor="nombreCliente" className="uppercase font-varela font-bold block">Nombre del Cliente</label>
                    <input type="text"
                           className="w-full border rounded-lg px-3 py-3 font-varela border-gray-200 shadow"
                           placeholder="Nombre del Cliente"
                           {...register("nombreCliente", {
                               required: "El nombre del proyecto es obligatorio"
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

                <div className="flex justify-center mt-10">
                    <input type="submit" value="Crear Proyecto" className="px-20 rounded-lg  text-xl cursor-pointer py-3 bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors duration-500 text-white font-varela font-bold"/>
                </div>
            </form>
        </>
    );
}
export default FormCreateProyecto;