import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuthServerError({ err, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (err) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [err]);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[-140px] left-1/4 transform -translate-x-1/2 bg-red-500 text-white px-16 py-4 rounded-lg shadow-lg text-lg font-semibold"
        >
            {err}
        </motion.div>
    );
}
