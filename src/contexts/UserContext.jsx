import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    _id: '',
    username: '',
    email: '',
    imageUrl: '',
    accessToken: '',
    firstName: '',
    lastName: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
    updateUserPartial: () => null,
    isAuth: false,
    isAdmin: false,
    isBlocked: false,
});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [wasRedirected, setWasRedirected] = useState(false);

    const userLoginHandler = (authData) => {
        localStorage.setItem("user", JSON.stringify(authData));
        setUser(authData);
        setWasRedirected(false);
    };


    const userLogoutHandler = () => {
        localStorage.removeItem("user");
        setUser(null);
        setWasRedirected(true)

    };

    const updateUserPartial = (newData) => {
        setUser((prev) => {
            const updated = { ...prev, ...newData };
            localStorage.setItem("user", JSON.stringify(updated));
            return updated;
        });
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
        <UserContext.Provider value={{ ...user, userLoginHandler, userLogoutHandler, updateUserPartial, isAuth: !!user, wasRedirected, setWasRedirected }}>
            {children}
        </UserContext.Provider>
    );
};
