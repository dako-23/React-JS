import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Loader from "./Loader.jsx";
import groupChatService from '../services/groupChatService.js';
import GroupChatMessages from './GroupChatMessages.jsx'
import GroupChatSendMessage from './GroupChatSendMessage.jsx';
import GroupChatUsers from './GroupChatUsers.jsx';

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
    const location = useLocation();
    const { groupName } = location.state
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

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
                    <GroupChatUsers />
                    <div className="w-3/4 flex flex-col p-4">
                        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">💬 {groupName}</h2>

                        <div ref={chatContainerRef} className="flex-grow bg-gray-50 border rounded-lg p-4 overflow-y-auto">
                            {chatMessages.length === 0 ? (
                                <p className="text-gray-500 text-center">No messages yet...</p>
                            ) : (
                                chatMessages.map((msg, index) => (
                                    <GroupChatMessages
                                        key={index}
                                        {...msg}
                                    />
                                ))
                            )}
                        </div>
                        <GroupChatSendMessage
                            newMessage={newMessage}
                            sendMessage={sendMessage}
                            setNewMessage={setNewMessage}
                        />
                    </div>
                </div>
            </>}
        </motion.div>
    );
}
