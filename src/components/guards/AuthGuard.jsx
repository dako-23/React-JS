import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "../../hooks/useToast";



export default function AuthGuard() {

    const { isAuth } = useContext(UserContext)
    const toast = useToast()

    useEffect(() => {
        if (!isAuth) toast.error('You need to be logged in');
    }, [isAuth]);

    if (!isAuth) {
        return <Navigate to='users/login' />

    }

    return <Outlet />
}