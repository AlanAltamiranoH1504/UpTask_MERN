import type {SearchMemberResult} from "../../../types";
import {useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addMemberTeamPOST} from "../../../services/ProyectosService.ts";
import {toast} from "react-toastify";

type SearchResultProps = {
    data: SearchMemberResult
}
export type DataAddMember = {
    id_project: string,
    email: string
    id: string
}
const SearchResult = ({data}: SearchResultProps) => {
    const params = useParams();
    const queryClient = useQueryClient();
    const {id} = params;

    function add_member_function(email: string, id_user: string) {
        const data: DataAddMember = {
            id_project: id,
            email,
            id: id_user
        };
        addMemberTeamMutation.mutate(data);
    }

    const addMemberTeamMutation = useMutation({
        mutationKey: ["addMemberTeam"],
        mutationFn: addMemberTeamPOST,
        onSuccess: () => {
            toast.success("Colaborador agregado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["findTeamMembers"]
            });
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })
    return (
        <>
            <div className="mt-10 text-center font-bold text-sm font-varela">
                <div className="flex justify-between items-center">
                    <div>
                        <p>{data.usuarios.nombre} {" "} {data.usuarios.apellidos}</p>
                        <p className="text-xs text-gray-500">{data.usuarios.email}</p>
                    </div>
                    <button
                        onClick={() => {
                            add_member_function(data.usuarios.email, data.usuarios._id);
                        }}
                        className="text-purple-500 border rounded-lg border-2 border-purple-500 hover:bg-purple-200 hover:text-purple-600 transition-colors duration-500 py-1 px-3">Agregar
                        al Proyecto
                    </button>
                </div>
            </div>
        </>
    )
}
export default SearchResult;