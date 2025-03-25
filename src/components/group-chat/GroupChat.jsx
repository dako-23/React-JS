import React from 'react';
import { motion } from 'framer-motion';
import Loader from "../Loader.jsx";
import GroupChatMessages from './GroupChatMessages.jsx'
import GroupChatSendMessage from './GroupChatSendMessage.jsx';
import GroupChatUsers from './GroupChatUsers.jsx';
import GroupChatHeader from './GroupChatHeader.jsx';
import useGroupsChat from '../../hooks/useGroupsChat.js';

export default function GroupChat() {

    const { activeUsers, chatContainerRef, chatMessages, loading, newMessage, sendMessage, setNewMessage } = useGroupsChat()

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
