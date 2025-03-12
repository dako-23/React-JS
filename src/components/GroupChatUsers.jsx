import { BsFillCircleFill } from "react-icons/bs";

const users = [
    { id: 1, username: "Yordan" },
    { id: 2, username: "Emil" },
    { id: 3, username: "Stoyan" },
    { id: 4, username: "Maria" },
    { id: 5, username: "Elena" }
];

export default function GroupChatUsers() {

    return (
        <div className="w-1/4 bg-lime-100 p-4 border-r">
            <h3 className="text-lg font-semibold text-gray-800">👥 Online Users ({users.length})</h3>
            <ul className="mt-2 space-y-2">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                        <BsFillCircleFill className="text-green-500 animate-pulse" />
                        <span className="text-gray-700">{user.username}</span>
                    </div>
                ))}
            </ul>
        </div>
    );
}