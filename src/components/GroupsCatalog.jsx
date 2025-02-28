import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// test data
const groupsData = [
    { id: 1, name: "Moms in Sofia", members: 134 },
    { id: 2, name: "Newborn Care", members: 98 },
    { id: 3, name: "Toddler Activities", members: 45 },
    { id: 4, name: "Parenting Tips", members: 60 },
    { id: 5, name: "Baby Sleep Advice", members: 30 },
];

export default function GroupsList() {
    const navigate = useNavigate();
    const [joinedGroups, setJoinedGroups] = useState([]);

    const toggleJoin = (id) => {
        if (joinedGroups.includes(id)) {
            setJoinedGroups(joinedGroups.filter(groupId => groupId !== id)); // Напускане на групата
        } else {
            setJoinedGroups([...joinedGroups, id]); 
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto py-20"
        >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Join a Group</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupsData.map((group) => (
                    <div
                        key={group.id}
                        onClick={() => joinedGroups.includes(group.id) && navigate(`/groups/${group.id}`)}
                        className={`p-5 border border-gray-300 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg bg-gradient-to-r from-lime-100 to-green-200 ${
                            joinedGroups.includes(group.id) ? "border-lime-500" : ""
                        }`}
                    >
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        <p className="text-gray-500">{group.members} members</p>
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleJoin(group.id);
                            }}
                            className={`mt-3 px-4 py-2 rounded-lg font-medium transition ${
                                joinedGroups.includes(group.id) ? "bg-red-700 text-white" : "bg-gray-800 text-white"
                            }`}
                        >
                            {joinedGroups.includes(group.id) ? "Leave" : "Join"}
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
