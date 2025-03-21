import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useActionState, useContext } from "react";
import * as yup from "yup";
import AuthError from "./AuthError.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useRegister } from "../../api/authApi.js";
import AuthServerError from "./AuthServerError.jsx";

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    rePassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords do not match")
        .required("Confirm password is required"),
});

export default function Register() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext)
    const { register } = useRegister()

    const registerSubmitHandler = async (prevState, formData) => {
        const values = Object.fromEntries(formData);
        const userData = { username: values.username, email: values.email, password: values.password };

        try {
            setError(null);

            await validationSchema.validate(values, { abortEarly: false });

            const authData = await register(userData);

            userLoginHandler(authData)

            navigate('/my-profile');
            return values;
        } catch (err) {

            if (err.inner) {
                const errorMessages = {};
                err.inner.forEach(e => {
                    errorMessages[e.path] = e.message;
                });
                setError(errorMessages);
            } else {
                setError({ general: err.message });
            }
            return values;
        }
    };

    const [values, registerAction, isPending] = useActionState(registerSubmitHandler, {
        username: '',
        email: '',
        password: '',
        rePassword: '',
    });

    return (
        <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
            >
                {error?.general &&
                    <AuthServerError
                        err={error.general}
                        onClose={() => setError(null)}
                    />}
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

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`w-full p-3 border rounded-lg ${error?.password ? "border-red-500" : "border-gray-300"}`}
                        defaultValue={values.password}
                    />
                    {error?.password && <AuthError
                        err={error.password}
                    />}

                    <input
                        type="password"
                        name="rePassword"
                        placeholder="Confirm Password"
                        className={`w-full p-3 border rounded-lg ${error?.rePassword ? "border-red-500" : "border-gray-300"}`}
                        defaultValue={values.rePassword}
                    />
                    {error?.rePassword && <AuthError
                        err={error.rePassword}
                    />}

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
