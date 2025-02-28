import React, { useState } from "react";
import { motion } from "framer-motion";

export default function GroupPage() {

    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            setChatMessages([...chatMessages, { text: newMessage, sender: "You" }]);
            setNewMessage("");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto py-20"
        >
            {/* todo - dynamic title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">👥 Group Chat</h2>
            {/* Чат секция */}
            <div className="border border-gray-300 rounded-lg shadow-md p-5 h-96 overflow-y-auto mb-6">
                {chatMessages.length === 0 ? (
                    <p className="text-gray-500 text-center">No messages yet...</p>
                ) : (
                    chatMessages.map((msg, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            key={index}
                            className="mb-3">
                            <strong>{msg.sender}: </strong>
                            <span>{msg.text}</span>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Поле за писане на съобщение */}
            <div className="flex space-x-3">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a message..."
                    className="flex-grow p-3 border rounded-lg"
                />
                <button onClick={sendMessage} className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold">Send</button>
            </div>
        </motion.div >
    );
}
