import { useContext } from "react";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import GroupEdit from "./GroupEdit.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import useGroupListItem from "../../hooks/useGroupListItem.js";

export default function GroupListItems({
    _id,
    groupName,
    category,
    imageUrl,
    _ownerId,
    joinedGroup,
    isLocked,
    isJoined,
    toggleJoin,
    deleteGroup,
    editGroup,
    toggleLock
}) {
    const { _id: userId, isAdmin } = useContext(UserContext)
    const isOwner = _ownerId === userId

    const {
        closeEditModal,
        handleClick,
        handleEditGroup,
        menuOpen,
        showEditModal,
        setMenuOpen,
        buttonRef,
        menuRef,
        setShowEditModal,
    } = useGroupListItem(editGroup, isJoined, _id, isLocked)

    return (
        <>
            {showEditModal && <GroupEdit
                closeEditModal={closeEditModal}
                groupId={_id}
                handleEditGroup={handleEditGroup}
            />}
            <div
                className="relative p-5 border border-gray-300 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg bg-gradient-to-r from-lime-100 to-green-200"
                onClick={handleClick}
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
                        className={`px-4 py-2 rounded-lg font-medium transition ${isLocked ? "bg-gray-400 cursor-not-allowed" : isJoined
                            ? "bg-red-700 text-white hover:bg-red-400"
                            : "bg-gray-800 text-white hover:bg-gray-600"
                            }`}
                        disabled={isLocked}
                    >
                        {isLocked ? "Locked" : isJoined ? "Leave" : "Join"}
                    </button>

                    <div className="relative">
                        {(isOwner || isAdmin) && (
                            <button
                                ref={buttonRef}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpen(!menuOpen);
                                }}
                                className="bg-page-pattern rounded-full p-2 text-gray-700 hover:text-gray-900 shadow-md"
                            >
                                <BsThreeDotsVertical size={20} />
                            </button>)}

                        {menuOpen && (
                            <div ref={menuRef} className="absolute bottom-10 right-0 w-32 bg-page-pattern shadow-lg rounded-lg border border-gray-200 z-10">
                                {isOwner && <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEditModal(true)
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    <AiOutlineEdit className="mr-2" /> Edit
                                </button>}
                                {(isOwner || isAdmin)}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteGroup(_id, groupName);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-red-700 hover:bg-red-100"
                                >
                                    <AiOutlineDelete className="mr-2" /> Delete
                                </button>
                                {isAdmin &&
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLock(_id);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-yellow-600 hover:bg-yellow-100"
                                    >
                                        {isLocked
                                            ?
                                            <FaLock className="mr-2" />
                                            :
                                            <FaLockOpen className="mr-2" />
                                        }

                                        {isLocked ? "Unlock" : "Lock"}
                                    </button>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
