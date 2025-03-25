import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    _id: '',
    username: '',
    email: '',
    imageUrl: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
    updateUserPartial: () => null,
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
        <UserContext.Provider value={{ ...user, userLoginHandler, userLogoutHandler, updateUserPartial, isAuth: !!user }}>
            {children}
        </UserContext.Provider>
    );
};
