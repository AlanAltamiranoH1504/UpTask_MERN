import {useForm} from "react-hook-form";
import type {FormCreateNote} from "../../types";
import {useSearchParams} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNotePOST} from "../../services/NotasService.ts";
import {toast} from "react-toastify";

const FormCreateNotes = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormCreateNote>();
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    function create_note_function(data: FormCreateNote) {
        data.tarea = searchParams.get("showTask")!;
        createNoteMutation.mutate(data);
    }

    const createNoteMutation = useMutation({
        mutationKey: ["createNote"],
        mutationFn: createNotePOST,
        onSuccess: () => {
            toast.success("Nota agregada correctemente");
            queryClient.invalidateQueries({
                queryKey: ["showDetailsTask", "findAllNotes"]
            });
            reset();
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    })

    return (
        <>
            <form
                className="scroll-py-3"
                onSubmit={handleSubmit(create_note_function)}
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-varela font-semibold mt-3"
                    >Crear Nota</label>
                    <input type="text" placeholder="Titulo de la Nota"
                           className="border px-3 py-2 rounded-lg border-gray-300 shadow"
                           {...register("titulo", {
                               required: "El titulo de la nota es obligatorio"
                           })}
                    />
                    <div className="bg-red-100 text-red-600 font-varela text-center rounded-md">
                        {errors.titulo && String(errors.titulo.message)}
                    </div>

                    <textarea className="border border-gray-300 px-3 py-2 rounded-lg bg-white shadow" rows={3}
                              placeholder="Ingresa alguna nota"
                              {...register("contenido", {
                                  required: "El contenido de la nota es obligatorio"
                              })}
                    ></textarea>
                    <div className="bg-red-100 text-red-600 font-varela text-center rounded-md">
                        {errors.contenido && String(errors.contenido.message)}
                    </div>
                </div>
                <input type="submit" value="Agregar Nota"
                       className="bg-purple-400 cursor-pointer hover:bg-purple-500 transition-colors duration-500 py-2 rounded-lg px-3 text-white font-varela font-semibold w-full mt-3"/>
            </form>
        </>
    );
}
export default FormCreateNotes;