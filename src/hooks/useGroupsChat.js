import { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGroupChat } from '../api/groupChatApi.js'
import { UserContext } from '../contexts/UserContext.jsx';

const socket = io('https://server-tgjz.onrender.com', {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

export default function useGroupsChat() {

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

    return {
        loading,
        activeUsers,
        chatContainerRef,
        chatMessages,
        newMessage,
        sendMessage,
        setNewMessage
    }
}