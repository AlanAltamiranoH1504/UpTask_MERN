import {useQuery} from "@tanstack/react-query";
import {findProyectoByIdGET} from "../../services/ProyectosService.ts";
import FormEditProyecto from "../../components/proyectos/FormEditProyecto.tsx";
import {Link, useParams} from "react-router-dom";

const EditProyectoView = () => {
    const params = useParams();
    const idProyecto: string | undefined = params.id;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findProyectoById"],
        queryFn: () => findProyectoByIdGET(idProyecto ?? ""),
        retry: false,
        refetchOnWindowFocus: false
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        // @ts-ignore
        return <div className="font-varela text-center font-semibold text-2xl">Ocurrio algun error en la busqueda: {error.response.data.message} {error.response.status}</div>;
    }
    if (data) return (
        <>
            <h1 className="text-5xl font-black font-varela">Edición Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Edita los datos del siguiente proyecto</p>

            <nav className="my-5">
                <Link to="/"
                      className="bg-purple-400 font-varela hover:bg-purple-500 transition-colors duration-500 px-10 py-3 text-white text-xl font-bold cursor-pointer rounded-lg">
                    Volver a Proyectos</Link>
            </nav>
            <div className="max-w-5xl mx-auto">
                <FormEditProyecto
                    proyecto={data}
                />
            </div>
        </>
    );
}
export default EditProyectoView;