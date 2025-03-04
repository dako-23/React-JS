import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService.js";


export default function Login() {
  const navigate = useNavigate()

  const LoginSubmitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData);

    try {
      await authService.login(email, password);

      navigate('/')
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">Login</h2>
        <motion.form onSubmit={LoginSubmitHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-lime-700"
          >
            Login
          </motion.button>
          <p className="text-center text-sm text-gray-800 mt-4">
            Don't have an account? <Link to="/register" className="text-lime-700 font-semibold">Register</Link>
            <button className="text-lime-700 hover:underline ml-1"></button>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
}

