import { BsFillCircleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";


export default function GroupChatUsers({
    users
}) {

    return (
        <div className="w-1/4 bg-lime-100 p-4 border-r">
            <h3 className="text-lg font-semibold text-gray-800">
                👥 Online Users ({users.length})
            </h3>

            <ul className="mt-4 space-y-3">
                {users.map((user) => (
                    <li key={user.userId} className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border bg-gray-200 shadow">
                            {user.imageUrl ? (
                                <img
                                    src={user.imageUrl}
                                    alt={user.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaUser className="text-gray-500 text-sm absolute inset-0 m-auto" />
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <BsFillCircleFill className="text-green-500 animate-pulse" />
                            <span className="text-gray-700 font-medium">{user.username}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}