import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService.js";
import { useState } from "react";


export default function Login() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const LoginSubmitHandler = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      await authService.login(values.email, values.password);

      navigate('/');

    } catch (err) {
      console.log(err);
    }
    console.log({ email: values.email, password: values.password });
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
        <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">Login</h2>
        <motion.form onSubmit={LoginSubmitHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={onChangeHandler} value={values.email} />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg" onChange={onChangeHandler} value={values.password} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={pending}
            value="Login"
            className={`w-full p-3 ${pending ? 'bg-gray-400 text-white rounded-lg cursor-not-allowed' : 'bg-gray-800 text-white rounded-lg'}`}
          >
            Login
          </motion.button>
          <p className="text-center text-sm text-gray-800 mt-4">
            Don't have an account? <Link to="/users/register" className="text-lime-700 font-semibold">Register</Link>

            <button className='hover:underline ml-1 text-lime-700'></button>

          </p>
        </motion.form>
      </motion.div>
    </div>
  );
}

