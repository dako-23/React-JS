import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "../../hooks/useToast";



export default function GuestGuard() {

    const { isAuth } = useContext(UserContext)
    const toast = useToast()

    useEffect(() => {
        if (isAuth) toast.error('You are already logged in');
    }, []);

    if (isAuth) {
        return <Navigate to='/' />

    }

    return <Outlet />
}