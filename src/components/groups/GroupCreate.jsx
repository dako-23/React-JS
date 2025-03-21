import { motion, AnimatePresence } from "framer-motion";

export default function GroupCreate({
    onClose,
    onSubmitCreate
}) {
    const inputClass = 'w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-600'

    const handleSubmitCreate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const groupData = Object.fromEntries(formData)

        onSubmitCreate(groupData)
        onClose()
    }

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
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">📌 Create a Group</h2>
                        <form className="space-y-4" onSubmit={handleSubmitCreate} >
                            <input className={inputClass} type="text" name="groupName" placeholder="Group Name" />
                            <input className={inputClass} type="text" name="location" placeholder="Enter city or area (optional)" />
                            <input className={inputClass} type="text" name="rules" placeholder="Set some group rules (optional)" />
                            <textarea className={inputClass} rows="3" name="description" placeholder="Describe your group"></textarea>
                            <select className={inputClass} name="category">
                                <option disabled value="category">Select category...</option>
                                <option value="support">👩‍👧 Parenting Support</option>
                                <option value="meetups">🎉 Meetups & Playdates</option>
                                <option value="advice">🍼 Newborn Advice</option>
                                <option value="activities">🧸 Activities & Crafts</option>
                            </select>
                            <input className={inputClass} id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" />
                            <div className="flex justify-between">
                                <button onClick={onClose} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                                <button className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700">Create</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}