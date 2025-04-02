import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Loader.jsx";
import { useState } from "react";
import { useToast } from "../../hooks/useToast.js";

export default function GroupCreate({ onClose, onSubmitCreate }) {
    const [isLoading, setIsLoading] = useState(false);
    const { error } = useToast();

    const [formData, setFormData] = useState({
        groupName: '',
        location: '',
        rules: '',
        description: '',
        category: '',
        imageUrl: ''
    });

    const inputClass = 'w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-600';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            await onSubmitCreate(formData);

            setIsLoading(false);

        } catch (err) {
            setIsLoading(false);
            error(err.message);
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
                    {isLoading
                        ? <Loader />
                        : <div>
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">📌 Create a Group</h2>
                            <form className="space-y-4" onSubmit={handleSubmitCreate}>
                                <input className={inputClass} type="text" name="groupName" placeholder="Group Name*" value={formData.groupName} onChange={handleChange} />
                                <input className={inputClass} type="text" name="location" placeholder="Enter city or area (optional)" value={formData.location} onChange={handleChange} />
                                <input className={inputClass} type="text" name="rules" placeholder="Set some group rules (optional)" value={formData.rules} onChange={handleChange} />
                                <textarea className={inputClass} rows="3" name="description" placeholder="Describe your group*" value={formData.description} onChange={handleChange}></textarea>
                                <select className={inputClass} name="category" value={formData.category} onChange={handleChange}>
                                    <option disabled hidden value="">Select category...*</option>
                                    <option value="support">👩‍👧 Parenting Support</option>
                                    <option value="meetups">🎉 Meetups & Playdates</option>
                                    <option value="advice">🍼 Newborn Advice</option>
                                    <option value="activities">🧸 Activities & Crafts</option>
                                </select>
                                <input className={inputClass} name="imageUrl" type="text" placeholder="Image Url*" value={formData.imageUrl} onChange={handleChange} />
                                <div className="flex justify-between">
                                    <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700">Create</button>
                                </div>
                            </form>
                        </div>}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
