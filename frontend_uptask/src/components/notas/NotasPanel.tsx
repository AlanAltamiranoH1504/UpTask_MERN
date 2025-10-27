import FormCreateNotes from "./FormCreateNotes.tsx";

type NotasPanelProps = {
    notas:
        | {
        _id: string;
        titulo: string;
        contenido: string;
        createdBy: string;
        tarea: {
            _id: string;
            nombre: string;
            descripcion: string;
        };
    }[]
        | undefined;
}
const NotasPanel = ({notas}: NotasPanelProps) => {
    return (
        <>
            {notas?.length > 0 ? (
                <>
                    <div className="divide-y divide-gray-100 mt-10">
                        <p className="font-varela text-2xl text-slate-600 mb-1 font-semibold">Notas: </p>
                        {notas?.map((nota) => (
                            <>
                                <div className="px-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-varela font-semibold ">{nota.titulo} por: {nota.createdBy}</p>
                                        <p className="font-varela text-sm ml-3 text-gray-400"> - {nota.contenido}</p>
                                    </div>
                                </div>
                            </>
                        ))}
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