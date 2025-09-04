import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppRouter from "./AppRouter.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppRouter/>
            <ReactQueryDevtools/>
            <ToastContainer/>
        </QueryClientProvider>
    </StrictMode>,
)
