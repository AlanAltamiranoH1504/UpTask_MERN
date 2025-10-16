import {useForm} from "react-hook-form";
import type {FormSearchMembers} from "../../../types";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {searchMemberPOST} from "../../../services/ProyectosService.ts";
import SearchResult from "./SearchResult.tsx";

const AddMemberForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormSearchMembers>();
    const params = useParams();
    const {id} = params;

    function search_member_function(data: FormSearchMembers) {
        data._id = id;
        serachMembersMutation.mutate(data);
    }

    const serachMembersMutation = useMutation({
        mutationKey: ["searchMember"],
        mutationFn: searchMemberPOST
    });

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(search_member_function)}
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                    >E-mail de Usuario</label>
                    <input
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full py-2 px-3 rounded-lg  border-gray-300 border"
                        {...register("email", {
                            required: "El email de busqueda es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-varela rounded-md">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    className=" bg-purple-400 font-varela hover:bg-purple-500 w-full py-2 px-3 rounded-lg  text-white font-black  text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>
            {serachMembersMutation.isPending && <p className="font-varela text-center mt-5">Cargando...</p>}
            {serachMembersMutation.error && <p className="font-varela text-center mt-5 text-red-600">{serachMembersMutation.error.response?.data?.message}</p>}
            {serachMembersMutation.data && <SearchResult data={serachMembersMutation.data}/>}
        </>
    );
}
export default AddMemberForm;