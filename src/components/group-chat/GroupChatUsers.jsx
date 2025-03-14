import { BsFillCircleFill } from "react-icons/bs";

export default function GroupChatUsers({
    users
}) {

    return (
        <div className="w-1/4 bg-lime-100 p-4 border-r">
            <h3 className="text-lg font-semibold text-gray-800">👥 Online Users ({users.length})</h3>
            <ul className="mt-2 space-y-2">
                {users.map((user) => (
                    <div key={user.userId} className="flex items-center gap-2">
                        <BsFillCircleFill className="text-green-500 animate-pulse" />
                        <span className="text-gray-700">{user.username}</span>
                    </div>
                ))}
            </ul>
        </div>
    );
}