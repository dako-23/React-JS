import { useState } from "react";

export default function useAuth() {

    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState({
        username: false,
        email: false,
        current: false,
        new: false,
        confirm: false
    });

    const toggleVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };


    return {
        error,
        setError,
        showPassword,
        toggleVisibility
    }

}
