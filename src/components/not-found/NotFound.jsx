import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center min-h-screen bg-page-pattern px-4"
        >
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md text-center">
                <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-500 mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-lime-600 text-white px-5 py-2 rounded-lg hover:bg-lime-700 transition"
                >
                    <FaArrowLeft /> Go Home
                </Link>
            </div>
        </motion.div>
    );
}
