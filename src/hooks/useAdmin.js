import { useEffect, useState } from "react";
import { useAdminApi } from "../api/adminApi";
import { useToast } from "./useToast";

export default function useAdmin() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const { error, info } = useToast();
    const { blockUser, makeAdmin, getAllUsers } = useAdminApi();

    useEffect(() => {
        try {
            getAllUsers().then(setUsers)
        } catch (err) {
            error(err.message)
        }
    }, []);

    const filteredPosts = users
        .filter((p) =>
            p.username.toLowerCase().includes(search.toLowerCase())
        )

    const handleToggleBlock = async (userId) => {
        try {
            const updatedUser = await blockUser(userId);

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, isBlocked: updatedUser.isBlocked } : user
                )
            );

            updatedUser.isBlocked ? info(`${updatedUser.username} has been successfully blocked.`) : info(`${updatedUser.username} has been unblocked.`)

        } catch (err) {
            error(err.message);
        }
    };

    const handleToggleAdmin = async (userId) => {
        try {
            const updatedUser = await makeAdmin(userId);

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, isAdmin: updatedUser.isAdmin } : user
                )
            )

            updatedUser.isAdmin ? info(`${updatedUser.username} has been granted with admin privileges.`) : info(`${updatedUser.username} is no longer an admin.`)

        } catch (err) {
            error(err.message)
        }
    };


    return {
        handleToggleBlock,
        handleToggleAdmin,
        users,
        setUsers,
        filteredPosts,
        setSearch,
        search
    }
}