import { motion } from 'framer-motion';
import { FaUser } from "react-icons/fa";

import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';

export default function GroupChatMessages({
    senderId,
    message,
    username,
    timestamp,
    imageUrl
}) {

    const { _id: userId,  } = useContext(UserContext)

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-2 ${senderId == userId ? "justify-end" : "justify-start"} mb-3`}
        >
            {senderId !== userId && (
                <div className="w-8 h-8 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center shadow">
                    {imageUrl ? (
                        <img src={imageUrl} alt={username} className="w-full h-full object-cover" />
                    ) : (
                        <FaUser className="text-gray-500 text-sm" />
                    )}
                </div>
            )}

            <div
                className={`p-3 rounded-lg shadow-md max-w-xs ${senderId == userId ? "bg-lime-200 text-gray-800" : "bg-white border"
                    }`}
            >
                <strong className="block text-sm text-gray-600">{username}</strong>
                <p className="text-gray-700">{message}</p>
                <span className="text-xs text-gray-400 block mt-1 text-right">
                    {new Date(timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour12: false,
                    })}
                </span>
            </div>
            {senderId == userId && (
                <div className="w-8 h-8 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center shadow">
                    {imageUrl ? (
                        <img src={imageUrl} alt={username} className="w-full h-full object-cover" />
                    ) : (
                        <FaUser className="text-gray-500 text-sm" />
                    )}
                </div>
            )}
        </motion.div>
    );
}