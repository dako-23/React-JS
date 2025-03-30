import "@fortawesome/fontawesome-free/css/all.min.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useActionState, useContext, useState } from "react";
import AuthError from "./AuthError.jsx";
import { useLogin } from "../../api/authApi.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useToast } from "../../hooks/useToast.js";
import useAuth from "../../hooks/useAuth.js";

export default function Login() {
  const { error: errToast } = useToast()
  const { login, validationLoginSchema } = useLogin();
  const { userLoginHandler } = useContext(UserContext);
  const { error, setError, showPassword, toggleVisibility } = useAuth();
  const navigate = useNavigate();

  const LoginSubmitHandler = async (prevState, formData) => {
    const values = Object.fromEntries(formData);

    try {
      setError(null);

      await validationLoginSchema.validate(values, { abortEarly: false });

      const authData = await login(values.email, values.password);

      userLoginHandler(authData)

      navigate('/');

      return values;
    } catch (err) {

      if (err.inner) {
        const errorMessages = {};
        err.inner.forEach(e => {
          errorMessages[e.path] = e.message;
        });
        setError(errorMessages);
      } else {
        errToast(err.message)
      }

      return values;
    }
  };

  const [values, loginAction, isPending] = useActionState(LoginSubmitHandler,
    {
      email: '',
      password: ''
    });

  return (
    <>
      <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">Login</h2>
          <motion.form action={loginAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`w-full p-3 border rounded-lg ${error?.email ? "border-red-500" : "border-gray-300"}`}
              defaultValue={values.email} />
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isPending}
              value="Login"
              className={`w-full p-3 ${isPending ? 'bg-gray-400 text-white rounded-lg cursor-not-allowed' : 'bg-gray-800 text-white rounded-lg'}`}
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
    </>
  );
}

