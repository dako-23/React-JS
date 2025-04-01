import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

export default function AuthGuard() {
    const { isAuth, wasRedirected, setWasRedirected } = useContext(UserContext);
    const toast = useToast();

    useEffect(() => {
        if (!isAuth && !wasRedirected) {
            toast.error("You need to be logged in");
            setWasRedirected(true);
        }
    }, [isAuth]);

    if (!isAuth) {
        return <Navigate to={wasRedirected ? "/" : "/users/login"} />;
    }

    return <Outlet />;
}
