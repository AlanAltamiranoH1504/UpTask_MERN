import {Link, Outlet} from "react-router-dom";
import Logo from "../components/Logo.tsx";

const AuthLayout = () => {
    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-2xl mx-auto flex flex-col lg:flex-row justify-center items-center">
                    <div className="w-64">
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </div>
                </div>
            </header>
            <section className="max-w-screen-lg mx-auto mt-10 p-5">
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
export default AuthLayout;