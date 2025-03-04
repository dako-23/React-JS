import React, { useState } from "react";
import { motion } from "framer-motion";
import GroupListItems from "./GroupListItems.jsx";
import GroupCreate from "./GroupCreate.jsx";

// test data
const groupsData = [
    { _id: 1, name: "Moms in Sofia", members: 134 },
    { _id: 2, name: "Newborn Care", members: 98 },
    { _id: 3, name: "Toddler Activities", members: 45 },
    { _id: 4, name: "Parenting Tips", members: 60 },
    { _id: 5, name: "Baby Sleep Advice", members: 30 },
];

export default function GroupsList() {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(null)

    const toggleJoin = (groupId) => {
        setJoinedGroups(state =>
            state.includes(groupId) ? state.filter(id => id !== groupId) : [...state, groupId]
        );
    };



    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto py-20"
        >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">📢 Join a Group</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupsData.map((group) => (
                    <GroupListItems
                        key={group._id}
                        _id={group._id}
                        name={group.name}
                        members={group.members}
                        isJoined={joinedGroups.includes(group._id)}
                        toggleJoin={toggleJoin}
                    />
                ))}
            </div>
            {showCreateGroup && <GroupCreate />}
        </motion.div >
    );
}
