import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import GroupListItems from "./GroupListItems.jsx";
import GroupCreate from "./GroupCreate.jsx";
import Loader from "../Loader.jsx";
import scrollToTop from "../../helpers/scrollToTop.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useGroup, useGroupGetAll } from "../../api/groupApi.js";

export default function GroupsList() {
    const [showCreateGroup, setShowCreateGroup] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const groupsPerPage = 4;
    const { isAuth, _id: userId } = useContext(UserContext)
    const { create, joinGroup, leaveGroup, editGroup, groupDelete } = useGroup()
    const { groups, setGroups, joinedGroups, setJoinedGroups, loading } = useGroupGetAll();

    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

    const totalPages = Math.ceil(groups.length / groupsPerPage);

    const createGroupHandler = async (groupData) => {

        const newGroup = await create(groupData);

        setGroups(state => [newGroup, ...state]);

        if (newGroup._ownerId === userId) {
            setJoinedGroups(state => [...state, newGroup._id])
        }

        setShowCreateGroup(null)
    }

    const joinGroupHandler = async (groupId) => {
        try {
            await joinGroup(groupId);

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

    const leaveGroupHandler = async (groupId) => {
        try {
            await leaveGroup(groupId);

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

    const editGroupHandler = async (updatedData, groupId) => {

        try {
            const result = await editGroup(groupId, updatedData);

            setGroups(prevGroups =>
                prevGroups.map(group =>
                    group._id === groupId ? { ...group, ...updatedData } : group
                )
            );
            return result
        } catch (err) {
            console.error("Error editing group:", err);
        }
    }

    const deleteGroup = async (groupId, groupName) => {
        const hasConfirm = confirm(`Are you sure you want to delete ${groupName} group?`)

        if (!hasConfirm) return;

        try {
            await groupDelete(groupId);

            setGroups(prevGroups => prevGroups.filter(group => group._id !== groupId));

        } catch (err) {
            console.error("Error leaving group:", err);
        }
    }


    const toggleJoin = (groupId) => {
        joinedGroups.includes(groupId)
            ?
            leaveGroupHandler(groupId)
            :
            joinGroupHandler(groupId)
    };

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    scrollToTop(currentPage);

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
                {isAuth &&
                    (<button onClick={setShowCreateGroup} className="flex items-center mb-12 gap-2 px-4 py-3 bg-gray-800 text-white text-lg font-medium rounded-full shadow-md hover:bg-gray-600 transition duration-300">
                        <FiPlusCircle size={22} /> Create Group
                    </button>)}
            </div>
            {loading ? (
                <Loader
                />) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentGroups.map(group => (
                        <GroupListItems
                            key={group._id}
                            isJoined={joinedGroups.includes(group._id)}
                            toggleJoin={toggleJoin}
                            deleteGroup={deleteGroup}
                            editGroup={editGroupHandler}
                            {...group}
                        />
                    ))}
                </div>
            )}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <button
                        onClick={() => {
                            changePage(currentPage - 1)
                        }}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
                    >
                        « Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => changePage(index + 1)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === index + 1
                                ? "bg-gradient-to-r from-lime-100 to-green-200 text-gray-800 scale-110 shadow-md"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            changePage(currentPage + 1)
                        }}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
                    >
                        Next »
                    </button>
                </div>
            )}
            {showCreateGroup && <GroupCreate
                onClose={closeShowCreateGroupHandler}
                onSubmitCreate={createGroupHandler}
            />}
        </motion.div >
    );
}
