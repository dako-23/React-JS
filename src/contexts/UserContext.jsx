import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    _id: '',
    username: '',
    email: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
    isAuth: false,
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const userLoginHandler = (authData) => {
        localStorage.setItem("user", JSON.stringify(authData));
        setUser(authData);
    };

    const userLogoutHandler = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ ...user, userLoginHandler, userLogoutHandler, isAuth: !!user }}>
            {children}
        </UserContext.Provider>
    );
};
