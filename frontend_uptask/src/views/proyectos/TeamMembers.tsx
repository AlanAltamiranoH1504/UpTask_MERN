import {useQuery} from "@tanstack/react-query";
import {findTeamMembersGET} from "../../services/ProyectosService.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import AddMemberModal from "../../components/proyectos/members/AddMemberModal.tsx";

const TeamMembers = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {id} = params;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findTeamMembers"],
        queryFn: () => findTeamMembersGET(id),
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Ocurrio un error en la busqeuda de miembros: {error.response.data.message}</div>;
    }

    if (data) return (
        <>
            <h1 className="text-5xl font-black font-varela">Administrar Equipo </h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Administra el equipo de trabajo para el proyecto <span className="font-semibold">{data.members.nombreProyecto}</span></p>

            <nav className="my-5 flex gap-3">
                <button type="button"
                        onClick={() => navigate("?addMember=true")}
                        className="bg-purple-400 font-varela hover:bg-purple-500 transition-colors rounded-lg font-bold duration-500 px-10 py-3 text-white text-xl cursor-pointer"
                >Agregar Integrante
                </button>
                <Link
                    to={`/proyectos/${id}`}
                    className="bg-purple-400 font-varela hover:bg-purple-500 transition-colors rounded-lg font-bold duration-500 px-10 py-3 text-white text-xl cursor-pointer">Volver a Proyecto</Link>
            </nav>

            <AddMemberModal/>
        </>
    );
}
export default TeamMembers;