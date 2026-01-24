import {Link} from "react-router-dom";

export const Page404 = () => {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-black">Pagina no Encontrada</h1>

            <div className="text-fuchsia-500 mt-10">
                <svg className="mx-auto h-20 w-20" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v2.25M12 15h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"/>
                </svg>
            </div>
            <p className="mt-5 flex mx-auto justify-center items-center bg-fuchsia-500 w-2/5 text-2xl text-white border rounded-lg py-1 font-semibold font-varela cursor-pointer transition-colors duration-500 hover:bg-fuchsia-600">
                <Link to={"/login"}>Home</Link>
            </p>
        </>
    );
}