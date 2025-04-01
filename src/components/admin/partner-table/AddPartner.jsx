import { motion } from "framer-motion";

export default function AddPartner({ onClose, postAction, isPending }) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <motion.div
                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <h2 className="text-xl font-bold mb-4 text-center">Add New Partner</h2>
                <form className="space-y-4" action={postAction}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Partner name"
                        className="w-full p-3 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="url"
                        placeholder="Website link"
                        className="w-full p-3 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="logo"
                        placeholder="Logo URL"
                        className="w-full p-3 border rounded-lg"
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700"
                        >
                            {isPending ? "Adding..." : "Add Partner"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
