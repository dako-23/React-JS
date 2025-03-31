import { useEffect } from "react";
import { useAdminApi } from "../../../api/adminApi.js";
import { FaSearch, FaUser } from "react-icons/fa";
import Pagination from "../../pagination/Pagination.jsx";
import { usePagination } from "../../../hooks/usePagination.js";
import useAdmin from "../../../hooks/useAdmin.js";

export default function UserTable() {

    const { handleToggleAdmin, handleToggleBlock, filteredPosts, setSearch, search } = useAdmin();
    const { currentPage, totalPages, currentData, changePage } = usePagination(filteredPosts, 10)

    return (
        <div className="mt-10">
            <div className="flex flex-col items-center justify-center mb-8">
                <h3 className="text-xl font-bold mb-4 text-center">User Management</h3>
                <div className="flex items-center gap-2 w-full max-w-md">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600 w-full bg-page-pattern"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-page-pattern border border-gray-200 shadow rounded-xl">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm text-gray-700 uppercase">
                            <th className="p-3">Image</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">First Name</th>
                            <th className="p-3">Last Name</th>
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
                                <td className="p-3">{user.email ? user.email : 'Not specified'}</td>
                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={() => handleToggleBlock(user._id)}
                                        className={`px-3 py-1 rounded w-[80px] text-white text-sm ${user.isBlocked ? "bg-red-600" : "bg-blue-600"} hover:opacity-80`}
                                    >
                                        {user.isBlocked ? "Unblock" : "Block"}
                                    </button>
                                    <button
                                        onClick={() => handleToggleAdmin(user._id)}
                                        className={`px-3 py-1 rounded w-[120px] text-white text-sm ${user.isAdmin ? "bg-yellow-600" : "bg-lime-700"} hover:opacity-80`}
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
