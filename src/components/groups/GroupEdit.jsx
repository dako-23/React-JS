import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useGroup } from "../../api/groupApi.js";
const inputClass = 'w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-600'


export default function GroupEdit({
    onClose,
    onSubmitEdit,
    groupId
}) {
    const [groupInfo, setGroupInfo] = useState([]);
    const [category, setCategory] = useState("");
    const { getOne } = useGroup()

    useEffect(() => {
        getOne(groupId)
            .then(result => {
                setGroupInfo(result)

                if (result.category) {
                    setCategory(result.category);
                }
            })
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "category") {
            setCategory(e.target.value);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    className="bg-page-pattern p-6 rounded-xl shadow-xl w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">📌 Edit a Group</h2>
                        <form className="space-y-4" onSubmit={onSubmitEdit} >
                            <input className={inputClass} type="text" name="groupName" placeholder="Group Name" defaultValue={groupInfo.groupName} />
                            <input className={inputClass} type="text" name="location" placeholder="Enter city or area (optional)" defaultValue={groupInfo.location} />
                            <input className={inputClass} type="text" name="rules" placeholder="Set some group rules (optional)" defaultValue={groupInfo.rules} />
                            <textarea className={inputClass} rows="3" name="description" placeholder="Describe your group" defaultValue={groupInfo.description}></textarea>
                            <select className={inputClass} name="category" value={category} onChange={handleChange}>
                                <option disabled value="category">Select category...</option>
                                <option value="support">👩‍👧 Parenting Support</option>
                                <option value="meetups">🎉 Meetups & Playdates</option>
                                <option value="advice">🍼 Newborn Advice</option>
                                <option value="activities">🧸 Activities & Crafts</option>
                            </select>
                            <input className={inputClass} id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" defaultValue={groupInfo.imageUrl} />
                            <div className="flex justify-between">
                                <button onClick={onClose} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                                <button className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700">Edit</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}