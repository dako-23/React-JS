import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import GroupListItems from "./GroupListItems.jsx";
import GroupCreate from "./GroupCreate.jsx";
import Loader from "../Loader.jsx";
import scrollToTop from "../../helpers/scrollToTop.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useGroupsList } from "../../hooks/useGroupList.js";
import GroupsPagination from "./GroupsPagination.jsx";


export default function GroupsList() {
    const { isAuth, _id: userId } = useContext(UserContext);
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    const {
        loading,
        currentGroups,
        joinedGroups,
        currentPage,
        totalPages,
        changePage,
        createGroupHandler,
        editGroupHandler,
        deleteGroupHandler,
        toggleJoin,
    } = useGroupsList(userId);

    scrollToTop(currentPage);


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
                            deleteGroup={deleteGroupHandler}
                            editGroup={editGroupHandler}
                            {...group}
                        />
                    ))}
                </div>
            )}
            <GroupsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={changePage} />
            {showCreateGroup && <GroupCreate
                onClose={() => setShowCreateGroup(false)}
                onSubmitCreate={createGroupHandler}
            />}
        </motion.div >
    );
}
