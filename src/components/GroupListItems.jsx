import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function GroupListItems({
    _id,
    groupName,
    location,
    rules,
    description,
    imageUrl,
    joinedGroup,
    isJoined,
    toggleJoin,
}) {
    const navigate = useNavigate();

    return (
        <div
            className="p-5 border border-gray-300 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg bg-gradient-to-r from-lime-100 to-green-200"
            onClick={() => isJoined && navigate(`/groups/${_id}`, { state: { groupName } })}
        >
            {imageUrl && (
                <motion.img
                    src={imageUrl}
                    alt={groupName}
                    className="w-full h-64 object-cover rounded-lg mb-3"
                    whileHover={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                />
            )}
            <h3 className="text-lg font-semibold">{groupName}</h3>
            <p className="text-gray-500">{joinedGroup.length} members</p>
            {isJoined ?
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleJoin(_id);
                    }}
                    className='mt-3 px-4 py-2 rounded-lg font-medium transition bg-red-700 text-white hover:bg-red-400'
                >
                    Leave
                </button>
                :
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleJoin(_id);
                    }}
                    className='mt-3 px-4 py-2 rounded-lg font-medium transition bg-gray-800 text-white hover:bg-gray-600'
                >
                    Join
                </button>
            }
        </div>
    );
}
