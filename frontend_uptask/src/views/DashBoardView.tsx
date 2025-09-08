import {Link} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteProyectoDELETE, findAllProyectosGET} from "../services/ProyectosService.ts";
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/16/solid";
import {Fragment} from "react";
import {toast} from "react-toastify";

const DashBoardView = () => {
    const queryCliente = useQueryClient();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["findAllProyectos"],
        queryFn: () => findAllProyectosGET(),
        retry: false,
        refetchOnWindowFocus: false
    });

    function deleteProyectoFunction(id: string) {
        deleteProyectoMutation.mutate(id);
    }

    const deleteProyectoMutation = useMutation({
        mutationKey: ["deleteProyectoById"],
        mutationFn: deleteProyectoDELETE,
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Proyecto eliminado correctamente");
            queryCliente.invalidateQueries({
                queryKey: ["findAllProyectos"]
            });
        }
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Something went wrong.</div>;
    }

    if (data) return (
        <>
            <h1 className="text-5xl font-black font-varela">Mis proyectos</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

            <nav className="my-5">
                <Link to="/proyectos/creacion"
                      className="bg-purple-400 font-varela hover:bg-purple-500 transition-colors duration-500 px-10 py-3 text-white text-xl font-bold cursor-pointer rounded-lg">Nuevo
                    Proyecto</Link>
            </nav>

            {data.proyectos.length > 0 ? (
                <ul className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data.proyectos.map((proyecto) => (
                        <li key={proyecto._id} className="flex justify-between gap-x-6 px-5 py-10 font-varela">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <Link to={``}
                                          className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                    >{proyecto.nombreProyecto}</Link>
                                    <p className="text-sm text-gray-400">
                                        Cliente: {proyecto.nombreCliente}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {proyecto.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true"/>
                                    </MenuButton>
                                    <Transition as={Fragment} enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95">
                                        <MenuItems
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                        >
                                            <MenuItem>
                                                <Link to={``}
                                                      className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    Ver Proyecto
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link to={``}
                                                      className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    Editar Proyecto
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => {
                                                        deleteProyectoFunction(proyecto._id)
                                                    }}
                                                >
                                                    Eliminar Proyecto
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <h2>No hay proyectos disponibles</h2>
            )}
        </>
    );
}
export default DashBoardView;