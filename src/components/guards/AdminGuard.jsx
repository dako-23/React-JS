import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

export default function AdminGuard() {
    const { isAdmin, wasRedirected, setWasRedirected } = useContext(UserContext);
    const toast = useToast();

    useEffect(() => {
        if (!isAdmin && !wasRedirected) {
            toast.error('You need to be admin!');
            setWasRedirected(true);
        }
    }, [isAdmin]);

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
