import FormCreateNotes from "./FormCreateNotes.tsx";
import {useMutation} from "@tanstack/react-query";
import {deleteNoteDELETE} from "../../services/NotasService.ts";
import {toast} from "react-toastify";

type NotasPanelProps = {
    notas:
        | {
        _id: string;
        titulo: string;
        contenido: string;
        createdBy: {
            _id: string;
            nombre: string;
            apellidos: string;
            email: string;
        };
        tarea: {
            _id: string;
            nombre: string;
            descripcion: string;
        };
    }[]
        | undefined;
}
const NotasPanel = ({notas}: NotasPanelProps) => {

    function deleteNoteLocal(idNota: string) {
        deleteNoteMutation.mutate(idNota);
    }
    const deleteNoteMutation = useMutation({
        mutationKey: ["deleteNote"],
        mutationFn: deleteNoteDELETE,
        onSuccess: () => {
            toast.success("Nota eliminada correctamente!");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    return (
        <>
            {notas?.length > 0 ? (
                <>
                    <div className="divide-y divide-gray-100 mt-10">
                        <p className="font-varela text-2xl text-slate-600 mb-1 font-semibold">Notas: </p>
                        <div className="max-h-52 overflow-y-auto space-y-3 pr-2">
                            {notas?.map((nota) => (
                                <>
                                    <div className="px-3 flex justify-between items-center">
                                        <div>
                                            <p className="font-varela font-semibold ">{nota.titulo} por: {nota.createdBy.nombre} {nota.createdBy.apellidos}</p>
                                            <p className="font-varela text-sm ml-3 text-gray-400"> - {nota.contenido}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                deleteNoteLocal(nota._id);
                                            }}
                                            className="bg-red-400 px-2 py-1 text-white font-varela font-semibold rounded-lg hover:bg-red-600 transition-colors duration-500">Eliminar</button>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <p>No existen notas para esta tarea</p>
                </>
            )}
            <FormCreateNotes/>
        </>
    );
}
export default NotasPanel;