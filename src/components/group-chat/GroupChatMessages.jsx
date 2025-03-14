import { motion } from 'framer-motion';

export default function GroupChatMessages({
    senderId,
    message,
    username,
    timestamp,
}) {

    const userId = localStorage.getItem('userId');

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${senderId == userId ? "justify-end" : "justify-start"} mb-3`}
        >
            <div className={`p-3 rounded-lg shadow-md max-w-xs ${senderId == userId ? "bg-lime-200 text-gray-800" : "bg-white border"}`}>
                <strong className="block text-sm text-gray-600">{username}</strong>
                <p className="text-gray-700">{message}</p>
                <span className="text-xs text-gray-400 block mt-1 text-right">
                    {new Date(timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour12: false
                    })}
                </span>
            </div>
        </motion.div>
    );
}