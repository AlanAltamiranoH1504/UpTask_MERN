import {Link, Outlet} from "react-router-dom";
import Logo from "../components/Logo.tsx";
import NavMenu from "../components/NavMenu.tsx";

const AppLayout = () => {
    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </div>
                    <NavMenu/>
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