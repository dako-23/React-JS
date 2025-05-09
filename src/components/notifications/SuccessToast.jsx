import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from 'react-icons/fa';

export default function SuccessToast({
    message,
    show
}) {
    setTimeout(() => (show(false)), 1000);
    return (
        <AnimatePresence>
            (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="fixed top-16  z-50 bg-lime-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2"
            >
                <FaCheckCircle className="w-8 h-8 text-white" />
                <span>{message}</span>
            </motion.div>
            )
        </AnimatePresence>
    );


}