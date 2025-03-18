import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import authService from "../../services/authService.js";
import { useState } from "react";

export default function Register() {
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: '',
    });


    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        setPending(true);

        const userData = { username: values.username, email: values.email, password: values.password };

        try {
            await authService.register(userData);

            navigate('/')
        } catch (err) {
            setPending(null)
            console.log(err);
        }
    }

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
            >
                <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">Register</h2>
                <motion.form method="POST" onSubmit={registerSubmitHandler}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <input type="text" name="username" placeholder="Username" className="w-full p-3 border rounded-lg" onChange={onChangeHandler} value={values.username} />
                    <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={onChangeHandler} value={values.email} />
                    <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg" onChange={onChangeHandler} value={values.password} />
                    <input type="password" name="rePassword" placeholder="Confirm Password" className="w-full p-3 border rounded-lg" onChange={onChangeHandler} value={values.rePassword} />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full p-3 ${pending ? 'bg-gray-400 text-white rounded-lg cursor-not-allowed' : 'bg-gray-800 text-white rounded-lg'}`}
                    >
                        Register
                    </motion.button>
                    <p className="text-center text-sm text-gray-800 mt-4">
                        Already have an account? <Link to="/users/login" className="text-lime-700 font-semibold">Login</Link>
                        <button className="text-lime-700 hover:underline ml-1"></button>
                    </p>
                </motion.form>
            </motion.div>
        </div>
    )
}