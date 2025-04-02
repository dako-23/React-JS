import "@fortawesome/fontawesome-free/css/all.min.css";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthError from "./AuthError.jsx";
import useAuth from "../../hooks/useAuth.js";

export default function Register() {

    const { isRegisterPending: isPending, valuesRegister: values, registerAction, error, showPassword, toggleVisibility } = useAuth();

    return (
        <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
            >

                <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">Register</h2>

                <motion.form action={registerAction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className={`w-full p-3 border rounded-lg ${error?.username ? "border-red-500" : "border-gray-300"}`}
                        defaultValue={values.username}
                    />
                    {error?.username && <AuthError
                        err={error.username}
                    />}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`w-full p-3 border rounded-lg ${error?.email ? "border-red-500" : "border-gray-300"}`}
                        defaultValue={values.email}
                    />
                    {error?.email && <AuthError
                        err={error.email}
                    />}

                    <div className="relative flex items-center">
                        <input
                            type={showPassword.current ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className={`w-full p-3 pr-10 border rounded-lg ${error?.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        <span
                            onClick={() => toggleVisibility('current')}
                            className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-800"
                        >
                            {showPassword.current ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </span>
                    </div>
                    {error?.password && <AuthError
                        err={error.password}
                    />}

                    <div className="relative flex items-center">
                        <input
                            type={showPassword.new ? 'text' : 'password'}
                            name="rePassword"
                            placeholder="Password"
                            className={`w-full p-3 pr-10 border rounded-lg ${error?.rePassword ? "border-red-500" : "border-gray-300"}`}
                        />
                        <span
                            onClick={() => toggleVisibility('new')}
                            className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-800"
                        >
                            {showPassword.new ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </span>
                    </div>
                    {error?.rePassword && <AuthError
                        err={error.rePassword}
                    />}

                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            id="agreeToTerms"
                            className="w-4 h-4 text-lime-600 border-gray-300 rounded focus:ring-lime-500"
                        />
                        <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                            I agree to the <Link to="/terms-and-conditions" className="text-lime-700 font-semibold underline">Terms & Conditions</Link>
                        </label>
                    </div>
                    {error?.agreeToTerms && (
                        <p className="text-sm text-red-500 mt-1">{error.agreeToTerms}</p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isPending}
                        className={`w-full p-3 ${isPending ? 'bg-gray-400 text-white rounded-lg cursor-not-allowed' : 'bg-gray-800 text-white rounded-lg'}`}
                    >
                        Register
                    </motion.button>
                </motion.form>

                <p className="text-center text-sm text-gray-800 mt-4">
                    Already have an account? <Link to="/users/login" className="text-lime-700 font-semibold">Login</Link>
                </p>
            </motion.div>
        </div>
    );
}
