import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import GroupListItems from "./GroupListItems.jsx";
import GroupCreate from "./GroupCreate.jsx";
import groupService from "../services/groupService.js";
import Loader from "./Loader.jsx";

export default function GroupsList() {
    const [groups, setGroups] = useState([])
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        groupService.getAll()
            .then(result => {
                setGroups(result);
                const userId = localStorage.getItem('userId');

                const userJoinedGroups = result
                    .filter(group => group.joinedGroup.includes(userId))
                    .map(group => group._id);

                setJoinedGroups(userJoinedGroups);

            })
            .finally(() => setLoading(null));
    }, []);

    const createGroupHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const groupData = Object.fromEntries(formData)

        const newGroup = await groupService.create(groupData);
        const userId = localStorage.getItem("userId");

        setGroups(state => [...state, newGroup]);

        if (newGroup._ownerId === userId) {
            setJoinedGroups(state => [...state, newGroup._id])
        }

        setShowCreateGroup(null)
    }

    const joinGroup = async (groupId) => {
        try {
            await groupService.joinGroup(groupId);
            const userId = localStorage.getItem("userId");

            setGroups((prevGroups) =>
                prevGroups.map((group) =>
                    group._id === groupId
                        ? {
                            ...group, joinedGroup: [...group.joinedGroup, userId]
                        }
                        : group
                )
            );

            setJoinedGroups((prev) => [...prev, groupId]);
        } catch (err) {
            console.error("Error joining group:", err);
        }
    };

    const leaveGroup = async (groupId) => {
        try {
            await groupService.leaveGroup(groupId);
            const userId = localStorage.getItem("userId");

            setGroups((prevGroups) =>
                prevGroups.map((group) =>
                    group._id === groupId
                        ? {
                            ...group, joinedGroup: group.joinedGroup.filter(id => id !== userId)
                        }
                        : group
                )
            );

            setJoinedGroups((prev) => prev.filter((id) => id !== groupId));
        } catch (err) {
            console.error("Error leaving group:", err);
        }
    };

    const toggleJoin = (groupId) => {
        joinedGroups.includes(groupId)
            ?
            leaveGroup(groupId)
            :
            joinGroup(groupId)

    };

    const closeShowCreateGroupHandler = () => {
        setShowCreateGroup(null)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
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
            {loading ? (
                <Loader
                />) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {groups.map(group => (
                        <GroupListItems
                            key={group._id}
                            isJoined={joinedGroups.includes(group._id)}
                            toggleJoin={toggleJoin}
                            {...group}
                        />
                    ))}
                </div>
            )}
            {showCreateGroup && <GroupCreate
                onClose={closeShowCreateGroupHandler}
                onSubmitCreate={createGroupHandler}
            />}
        </motion.div >
    );
}
