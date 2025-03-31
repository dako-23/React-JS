import { useEffect, useState } from "react";
import { useAdminApi } from "../../../api/adminApi.js";
import { FaUser } from "react-icons/fa";
import Pagination from "../../pagination/Pagination.jsx";
import { usePagination } from "../../../hooks/usePagination.js";
import { useToast } from "../../../hooks/useToast.js";

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const { error, info } = useToast();

    const { getAllUsers, blockUser, makeAdmin } = useAdminApi();

    useEffect(() => {
        getAllUsers().then(setUsers).catch(console.error);
    }, []);

    const { currentPage, totalPages, currentData, changePage } = usePagination(users, 10)

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

    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">User Management</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow rounded-xl">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm text-gray-700 uppercase">
                            <th className="p-3">Image</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">First Name</th>
                            <th className="p-3">Last Name</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((user) => (
                            <tr key={user._id} className="border-t border-gray-100 hover:bg-gray-50">
                                <td className="p-3">
                                    {user.imageUrl
                                        ?
                                        <img src={user.imageUrl} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                                        :
                                        <FaUser className="text-gray-600 w-10 h-10 rounded-full object-cover border" />}
                                </td>
                                <td className="p-3">{user.username ? user.username : 'Not specified'}</td>
                                <td className="p-3">{user.firstName ? user.firstName : 'Not specified'}</td>
                                <td className="p-3">{user.lastName ? user.lastName : 'Not specified'}</td>
                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={() => handleToggleBlock(user._id)}
                                        className={`px-3 py-1 rounded text-white text-sm ${user.isBlocked ? "bg-red-600" : "bg-blue-600"} hover:opacity-80`}
                                    >
                                        {user.isBlocked ? "Unblock" : "Block"}
                                    </button>
                                    <button
                                        onClick={() => handleToggleAdmin(user._id)}
                                        className={`px-3 py-1 rounded text-white text-sm ${user.isAdmin ? "bg-yellow-600" : "bg-lime-700"} hover:opacity-80`}
                                    >
                                        {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={changePage} />
            </div>
        </div>
    );
}
