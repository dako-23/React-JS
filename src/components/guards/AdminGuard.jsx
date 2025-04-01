import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

export default function AdminGuard() {

    const { isAdmin } = useContext(UserContext)
    const toast = useToast()

    useEffect(() => {
        if (!isAdmin) toast.error('You need to be admin!');
    }, []);

    if (!isAdmin) {
        return <Navigate to='/' />

    }

    return <Outlet />
}