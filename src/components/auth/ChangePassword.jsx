import "@fortawesome/fontawesome-free/css/all.min.css";
import { motion } from "framer-motion";
import AuthError from "./AuthError.jsx";
import useAuth from "../../hooks/useAuth.js";

export default function ChangePassword() {

    const { error, showPassword, toggleVisibility, changePasswordAction, isChangePending: isPending } = useAuth();

    return (
        <>
            <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
                >
                    <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">Change Password</h2>
                    <motion.form action={changePasswordAction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="relative flex items-center">
                            <input
                                type={showPassword.current ? 'text' : 'password'}
                                name="currentPassword"
                                placeholder="Current Password"
                                className={`w-full p-3 pr-10 border rounded-lg ${error?.currentPassword ? "border-red-500" : "border-gray-300"}`}
                            />
                            <span
                                onClick={() => toggleVisibility('current')}
                                className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-800"
                            >
                                {showPassword.current
                                    ? <i className="fas fa-eye-slash" />
                                    : <i className="fas fa-eye" />}
                            </span>
                        </div>
                        {error?.currentPassword && <AuthError
                            err={error.currentPassword} />}
                        <div className="relative flex items-center">
                            <input
                                type={showPassword.new ? 'text' : 'password'}
                                name="newPassword"
                                placeholder="New Password"
                                className={`w-full p-3 border rounded-lg ${error?.newPassword ? "border-red-500" : "border-gray-300"}`}
                            />
                            <span
                                onClick={() => toggleVisibility('new')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
                            >
                                {showPassword.new ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </span>
                        </div>
                        {error?.newPassword && <AuthError
                            err={error.newPassword}
                        />}
                        <div className="relative flex items-center">
                            <input
                                type={showPassword.confirm ? 'text' : 'password'}
                                name="confirmNewPassword"
                                placeholder="Confirm New Password"
                                className={`w-full p-3 border rounded-lg ${error?.confirmNewPassword ? "border-red-500" : "border-gray-300"}`}
                            />
                            <span
                                onClick={() => toggleVisibility('confirm')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
                            >
                                {showPassword.confirm ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </span>
                        </div>
                        {error?.confirmNewPassword && <AuthError
                            err={error.confirmNewPassword}
                        />}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isPending}
                            value="Change Password"
                            className={`w-full p-3 ${isPending ? 'bg-gray-400 text-white rounded-lg cursor-not-allowed' : 'bg-gray-800 text-white rounded-lg'}`}
                        >
                            Submit
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>
        </>
    );
}