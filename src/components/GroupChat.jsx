import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BsFillCircleFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Loader from "./Loader.jsx";
import groupChatService from '../services/groupChatService.js';

const socket = io('https://server-tgjz.onrender.com', {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

export default function GroupChat() {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const chatContainerRef = useRef(null);
    const { id: groupId } = useParams();
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    // test data
    const users = [
        { id: 1, username: "Yordan" },
        { id: 2, username: "Emil" },
        { id: 3, username: "Stoyan" },
        { id: 4, username: "Maria" },
        { id: 5, username: "Elena" }
    ];


    useEffect(() => {
        if (!groupId) return;

        setLoading(true)

        socket.emit('joinGroup', groupId);

        groupChatService.getChatHistory(groupId)
            .then(data => {
                const formattedMessages = data.map(msg => ({
                    ...msg,
                    senderId: msg.senderId?._id || msg.senderId, // always can be a string, important for validation!!
                }));
                setChatMessages(formattedMessages);
                setTimeout(scrollToBottom, 100);
            }).finally(() => setLoading(null))
            .catch(err => console.error('Error fetching chat history:', err));


        socket.on('receiveMessage', (message) => {
            // console.log('New message received:', message); 
            setChatMessages(prev => [...prev, message]);
            setTimeout(scrollToBottom, 100);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [groupId]);

    const sendMessage = async () => {

        if (newMessage.trim() === '' || !groupId || !userId || !username) return;

        try {
            const newMsg = { senderId: userId, message: newMessage, groupId, username };

            socket.emit('sendMessage', newMsg);

            setTimeout(scrollToBottom, 100);

            setNewMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto py-20"
        >
            {loading ? <Loader /> : <>
                <div className="flex h-[80vh] bg-white shadow-lg rounded-xl overflow-hidden">

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

                    <div className="w-3/4 flex flex-col p-4">
                        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">💬 Group Chat</h2>

                        <div ref={chatContainerRef} className="flex-grow bg-gray-50 border rounded-lg p-4 overflow-y-auto">
                            {chatMessages.length === 0 ? (
                                <p className="text-gray-500 text-center">No messages yet...</p>
                            ) : (
                                chatMessages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${msg.senderId == userId ? "justify-end" : "justify-start"} mb-3`}
                                    >
                                        <div className={`p-3 rounded-lg shadow-md max-w-xs ${msg.senderId == userId ? "bg-lime-200 text-gray-800" : "bg-white border"}`}>
                                            <strong className="block text-sm text-gray-600">{msg.username}</strong>
                                            <p className="text-gray-700">{msg.message}</p>
                                            <span className="text-xs text-gray-400 block mt-1 text-right">
                                                {new Date(msg.timestamp).toLocaleTimeString("en-US", {
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
                                ))
                            )}
                        </div>
                        <div className="flex space-x-3 mt-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Write a message..."
                                className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-lime-600"
                            />
                            <button onClick={sendMessage} className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-lime-700 transition">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </>}
        </motion.div>
    );
}
