import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {findTeamMembersGET, removeMemberTeamPOST} from "../../services/ProyectosService.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import AddMemberModal from "../../components/proyectos/members/AddMemberModal.tsx";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {EllipsisVerticalIcon} from "@heroicons/react/16/solid";
import type {DataToRemoveMember} from "../../types";
import {toast} from "react-toastify";
import type {AxiosError} from "axios";

const TeamMembers = () => {
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {id} = params;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findTeamMembers"],
        queryFn: () => findTeamMembersGET(id!),
        retry: false,
        refetchOnWindowFocus: false
    });

    function remove_member_function(data: DataToRemoveMember) {
        removeMemberTeamMutation.mutate(data);
    }

    const removeMemberTeamMutation = useMutation({
        mutationKey: ["removeMemberTeam", id],
        mutationFn: removeMemberTeamPOST,
        onSuccess: () => {
            toast.success("Colaborador eliminado del proyecto");
            queryClient.invalidateQueries({
                queryKey: ["findTeamMembers"]
            });
        },
        onError: (error: AxiosError) => {
            // @ts-ignore
            toast.error(error.response?.data?.message);
        }
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        // @ts-ignore
        return <div className="font-varela text-center text-xl">Ocurrio un error en la busqueda de miembros: {error.response.data.message}.</div>;
    }

    if (data) return (
        <>
            <h1 className="text-5xl font-black font-varela">Administrar Equipo </h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Administra el equipo de trabajo para el proyecto <span
                className="font-semibold">{data.members.nombreProyecto}</span></p>

            <nav className="my-5 flex gap-3">
                <button type="button"
                        onClick={() => navigate("?addMember=true")}
                        className="bg-purple-400 font-varela hover:bg-purple-500 transition-colors rounded-lg font-bold duration-500 px-10 py-3 text-white text-xl cursor-pointer"
                >Agregar Integrante
                </button>
                <Link
                    to={`/proyectos/${id}`}
                    className="bg-purple-400 font-varela hover:bg-purple-500 transition-colors rounded-lg font-bold duration-500 px-10 py-3 text-white text-xl cursor-pointer">Volver
                    a Proyecto</Link>
            </nav>

            {/* Listado de miembros de equipo*/}
            <h2 className="text-5xl font-black my-10 font-varela">Miembros actuales</h2>
            {data.members.equipo.length ? (
                <ul role="list"
                    className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg font-varela">
                    {data.members.equipo.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-xl  text-gray-600">
                                        {member.nombre} {" "} {member.apellidos}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true"/>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => {
                                                        remove_member_function({
                                                            idProject: id!,
                                                            id: member._id,
                                                            email: member.email
                                                        })
                                                    }}
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}

            <AddMemberModal/>
        </>
    );
}
export default TeamMembers;