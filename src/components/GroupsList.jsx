import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import GroupListItems from "./GroupListItems.jsx";
import GroupCreate from "./GroupCreate.jsx";

// test data
const groupsData = [
    { _id: 1, name: "Moms in Sofia", members: 134, imageUrl: 'https://media.istockphoto.com/id/1334507973/photo/young-mothers-in-park.jpg?s=612x612&w=0&k=20&c=qtxFBBVlPY2ulzCqFhh5T6zgcAmU3o1oo0TEi0pEn70=' },
    { _id: 2, name: "Newborn Care", members: 98, imageUrl: 'https://sahyadrihospital.com/wp-content/uploads/2021/04/Newborns-Babies-Diseases.jpg.webp' },
    { _id: 3, name: "Toddler Activities", members: 45, imageUrl: 'https://images.ctfassets.net/nis7p59xqtob/6GKyAXQqkzTGHLmMIticEh/dc711322c2728f2784b853285d3f3d2a/20220517_LearningCenter_FunFoodActivities.jpg?w=1920&q=50' },
    { _id: 4, name: "Parenting Tips", members: 60, imageUrl: 'https://toyzone.in/cdn/shop/articles/Good_Parenting_Tips.png?v=1681713625' },
    { _id: 5, name: "Baby Sleep Advice", members: 30, imageUrl: 'https://www.parents.com/thmb/VnlaN5z8ML552FPcXUkNyAKFxxo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-670930656-00630aa8bedf4003aaff6490281a91a8.jpg' },
];

export default function GroupsList() {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(null)

    const toggleJoin = (groupId) => {
        setJoinedGroups(state =>
            state.includes(groupId) ? state.filter(id => id !== groupId) : [...state, groupId]
        );
    };

    const closeShowCreateGroupHandler = () => {
        setShowCreateGroup(null)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto py-20"
        >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">📢 Join the Conversation – Motherhood Made Social!
                <p className="text-base text-gray-800 text-center max-w-2xl mx-auto mt-2 mb-4 font-medium">
                    Looking for advice, friendship, or just a good chat?
                    <span className="font-semibold"> Find your people, connect, and enjoy motherhood together!</span>
                </p>
            </h2>
            <div className="flex justify-center mt-14">
                <button onClick={setShowCreateGroup} className="flex items-center mb-12 gap-2 px-4 py-3 bg-gray-800 text-white text-lg font-medium rounded-full shadow-md hover:bg-gray-600 transition duration-300">
                    <FiPlusCircle size={22} /> Create Group
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupsData.map((group) => (
                    <GroupListItems
                        key={group._id}
                        _id={group._id}
                        name={group.name}
                        members={group.members}
                        imageUrl={group.imageUrl}
                        isJoined={joinedGroups.includes(group._id)}
                        toggleJoin={toggleJoin}
                    />
                ))}
            </div>
            {showCreateGroup && <GroupCreate
                onClose={closeShowCreateGroupHandler}
            />}
        </motion.div >
    );
}
