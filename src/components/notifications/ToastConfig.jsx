import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastConfig() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="mt-16"
            toastClassName={(option) => {
                const base = "flex justify-center items-center text-center font-semibold rounded-lg shadow-md px-8 py-2";
                if (option?.type === "success") return `${base} bg-lime-500 text-white`;
                if (option?.type === "error") return `${base} bg-red-500 text-white`;
                if (option?.type === "info") return `${base} bg-blue-500 text-white`;
                if (option?.type === "warning") return `${base} bg-yellow-400 text-gray-900`;
                return base;
            }}
        />
    );
}
