import { motion } from "framer-motion";
import { useActionState } from "react";
import { useChangePassword } from "../../api/authApi.js";




export default function ChangePassword() {

    const { changePassword } = useChangePassword();

    const changePasswordHandler = async (prevState, formData) => {

        const values = Object.fromEntries(formData);

        const { currentPassword, newPassword } = values

        await changePassword(currentPassword, newPassword)


    }


    const [_, changePasswordAction, isPending] = useActionState(changePasswordHandler,
        {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    const error = false

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
                        <input
                            type="currentPassword"
                            name="currentPassword"
                            placeholder="Current Password"
                            className={`w-full p-3 border rounded-lg ${error?.currentPassword ? "border-red-500" : "border-gray-300"}`}
                        />
                        {error?.currentPassword && <AuthError
                            err={error.currentPassword}
                        />}
                        <input
                            type="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            className={`w-full p-3 border rounded-lg ${error?.newPassword ? "border-red-500" : "border-gray-300"}`}
                        />
                        {error?.newPassword && <AuthError
                            err={error.newPassword}
                        />}
                        <input
                            type="confirmNewPassword"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                            className={`w-full p-3 border rounded-lg ${error?.confirmNewPassword ? "border-red-500" : "border-gray-300"}`}
                        />
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