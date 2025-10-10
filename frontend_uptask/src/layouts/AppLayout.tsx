import {Link, Outlet, useNavigate} from "react-router-dom";
import Logo from "../components/Logo.tsx";
import NavMenu from "../components/NavMenu.tsx";
import {useQuery} from "@tanstack/react-query";
import {showUserGET} from "../services/UsersService.ts";
const AppLayout = () => {

    const navigate = useNavigate();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["showUser"],
        queryFn: () => showUserGET(),
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        navigate("/login");
    }

    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </div>
                    <NavMenu
                        data={data}
                    />
                </div>
            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet/>
            </section>

            <footer className="py-5">
                <p className="text-center">
                    Todos los derechos reservados {new Date().getUTCFullYear()}
                </p>
            </footer>
        </>
    );
}
export default AppLayout;