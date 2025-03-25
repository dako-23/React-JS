import React, { useEffect, useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Loader from "../Loader.jsx";
import GroupChatMessages from './GroupChatMessages.jsx'
import GroupChatSendMessage from './GroupChatSendMessage.jsx';
import GroupChatUsers from './GroupChatUsers.jsx';
import GroupChatHeader from './GroupChatHeader.jsx';
import { UserContext } from '../../contexts/UserContext.jsx';
import { useGroupChat } from '../../api/groupChatApi.js';

const socket = io('https://server-tgjz.onrender.com', {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

export default function GroupChat() {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeUsers, setActiveUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const { _id: userId, username, imageUrl } = useContext(UserContext)
    const { getChatHistory } = useGroupChat()
    const chatContainerRef = useRef(null);
    const { id: groupId } = useParams();


    useEffect(() => {
        if (!groupId) return;

        setLoading(true)

        socket.emit('joinGroup', { groupId, userId, username, imageUrl });

        socket.on('updateActiveUsers', (users) => {
            setActiveUsers(users);
        });

        socket.on('receiveMessage', (message) => {
            setChatMessages(prev => [...prev, message]);
            setTimeout(scrollToBottom, 100);
        });

        socket.on("userLeft", (userId) => {
            setActiveUsers((prevUsers) =>
                prevUsers.filter(user => user.userId !== userId)
            );
        });

        getChatHistory(groupId)
            .then(data => {
                const formattedMessages = data.map(msg => ({
                    ...msg,
                    senderId: msg.senderId?._id || msg.senderId, // always can be a string, important for validation!!
                    imageUrl: msg.senderId.imageUrl
                }));
                setChatMessages(formattedMessages);
                

                setTimeout(scrollToBottom, 100);
            }).finally(() => setLoading(null))
            .catch(err => console.error('Error fetching chat history:', err));

        return () => {
            socket.emit('leaveGroup', { groupId, userId })
            socket.off('receiveMessage');
            socket.off('updateActiveUsers');
            socket.off('userLeft');
        };
    }, [groupId]);

    const sendMessage = async () => {

        if (newMessage.trim() === '' || !groupId || !userId || !username) return;

        try {
            const newMsg = { senderId: userId, message: newMessage, groupId, username, imageUrl };

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

                <div className="flex h-[80vh] bg-page-pattern shadow-lg rounded-xl overflow-hidden">
                    <GroupChatUsers
                        users={activeUsers}
                    />

                    <div className="w-3/4 flex flex-col p-4">
                        <GroupChatHeader />

                        <div ref={chatContainerRef} className="flex-grow bg-gradient-to-r from-lime-100 to-green-200 border rounded-lg p-4 overflow-y-auto">
                            {chatMessages.length === 0 ? (
                                <p className="text-gray-500 text-center">No messages yet...</p>
                            ) : (
                                chatMessages.map((msg) => (
                                    <GroupChatMessages
                                        key={msg._id}
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
