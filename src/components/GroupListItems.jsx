import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import groupService from "../services/groupService.js";

export default function GroupListItems({
    _id,
    groupName,
    location,
    rules,
    description,
    imageUrl,
    joinedGroup,
    isJoined,
    toggleJoin,
}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate();

    const groupDeleteClickHandler = async (groupId) => {
        const hasConfirm = confirm(`Are you sure you want to delete ${groupName} group?`)

        if (!hasConfirm) return;

        await groupService.deleteGroup(groupId)

        navigate('/groups');
    }

    return (
        <div
            className="relative p-5 border border-gray-300 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg bg-gradient-to-r from-lime-100 to-green-200"
            onClick={() => isJoined && navigate(`/groups/${_id}/chat`, { state: { groupName, groupLocation: location, rules, description } })}
        >
            {imageUrl && (
                <motion.img
                    src={imageUrl}
                    alt={groupName}
                    className="w-full h-64 object-cover rounded-lg mb-3"
                    whileHover={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            <h3 className="text-lg font-semibold">{groupName}</h3>
            <p className="text-gray-500">{joinedGroup.length} members</p>

            <div className="flex justify-between items-center mt-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleJoin(_id);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition ${isJoined
                        ? "bg-red-700 text-white hover:bg-red-400"
                        : "bg-gray-800 text-white hover:bg-gray-600"
                        }`}
                >
                    {isJoined ? "Leave" : "Join"}
                </button>

                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                        }}
                        className="bg-page-pattern rounded-full p-2 text-gray-700 hover:text-gray-900 shadow-md"
                    >
                        <BsThreeDotsVertical size={20} />
                    </button>

                    {menuOpen && (
                        <div className="absolute bottom-10 right-0 w-32 bg-page-pattern shadow-lg rounded-lg border border-gray-200 z-10">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Edit Group:", _id);
                                }}
                                className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                                <AiOutlineEdit className="mr-2" /> Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Delete Group:", _id);
                                    groupDeleteClickHandler(groupId)
                                }}
                                className="flex items-center w-full px-4 py-2 text-red-700 hover:bg-red-100"
                            >
                                <AiOutlineDelete className="mr-2" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
