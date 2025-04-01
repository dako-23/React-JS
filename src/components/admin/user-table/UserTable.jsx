import { FaUser } from "react-icons/fa";



export default function UserTable({
    currentData,
    handleToggleAdmin,
    handleToggleBlock
}) {


    return (
        <>
            <table className="min-w-full bg-page-pattern border border-gray-200 shadow rounded-xl">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-700 uppercase">
                        <th className="p-3">Image</th>
                        <th className="p-3">Username</th>
                        <th className="p-3">First Name</th>
                        <th className="p-3">Last Name</th>
                        <th className="p-3">Email</th>
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
        </>
    )
}