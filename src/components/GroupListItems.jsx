import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import GroupEdit from "./GroupEdit.jsx";

export default function GroupListItems({
    _id,
    groupName,
    category,
    location,
    rules,
    description,
    imageUrl,
    joinedGroup,
    isJoined,
    toggleJoin,
    deleteGroup,
    editGroup
}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [showEditGroup, setShowEditGroup] = useState(null)
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (buttonRef.current && buttonRef.current.contains(event.target)) {
                return;
            }

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeShowCreateGroupHandler = () => {
        setShowEditGroup(null)
    }

    const EditGroupHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const groupData = Object.fromEntries(formData)

        try {
            const res = await editGroup(groupData, _id)

            if (res) {
                setShowEditGroup(null)
            }
        } catch (err) {
            return console.log(err);
        }

    }

    return (
        <>
            {showEditGroup && <GroupEdit
                onClose={closeShowCreateGroupHandler}
                groupId={_id}
                onSubmitEdit={EditGroupHandler}
            />}
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

                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{groupName}</h3>

                    <span className="px-3 py-1 text-sm font-medium text-teal-700 bg-gradient-to-r from-lime-400 to-amber-200 rounded-full">
                        {category}
                    </span>
                </div>

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
                            ref={buttonRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpen(!menuOpen);
                            }}
                            className="bg-page-pattern rounded-full p-2 text-gray-700 hover:text-gray-900 shadow-md"
                        >
                            <BsThreeDotsVertical size={20} />
                        </button>

                        {menuOpen && (
                            <div ref={menuRef} className="absolute bottom-10 right-0 w-32 bg-page-pattern shadow-lg rounded-lg border border-gray-200 z-10">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEditGroup(true)
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    <AiOutlineEdit className="mr-2" /> Edit
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteGroup(_id, groupName);
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
        </>
    );
}
