import Logo from "../../components/Logo.tsx";
import {useForm} from "react-hook-form";
import type {FormConfirmUser} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {confirmUserPOST} from "../../services/UsersService.ts";
import {toast} from "react-toastify";

const ConfirUserView = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {token} = params;
    const {register, handleSubmit} = useForm<FormConfirmUser>();

    function confirmUserFunction(data: FormConfirmUser) {
        confirmUserMutation.mutate(data);
    }

    const confirmUserMutation = useMutation({
        mutationKey: ["confirmUser"],
        mutationFn: confirmUserPOST,
        onSuccess: () => {
            toast.success("Cuenta Confirmada Correctamente!");
            navigate("/login");
        },
        onError: (error: Error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    })

    return (
        <>
            <div className="bg-white border rounded-lg shadow">
                <form className="space-y-5 my-5 px-5"
                      onSubmit={handleSubmit(confirmUserFunction)}
                >
                    <div>
                        <h2 className="text-center text-xl font-varela font-semibold">Haz click en el siguiente enlace
                            para confirmar tu cuenta.</h2>
                    </div>
                    <div className="flex justify-end">
                        <Logo/>
                    </div>
                    <input
                        type="hidden"
                        value={token}
                        {...register("token", {
                            required: "Token obligatorio"
                        })}
                    />
                    <div className="flex justify-center items-center">

                        <input
                            type={"submit"}
                            className="border py-2 px-12 text-center font-varela font-semibold bg-purple-400 hover:bg-purple-500 transition-colors duration-500 text-white text-xl rounded-lg cursor-pointer"
                            value={"Confirmar Cuenta"}/>
                    </div>
                </form>
            </div>
        </>
    );
}
export default ConfirUserView;