import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-lime-700">
          {isLogin ? "Login" : "Register"}
        </h2>
        <div className="mt-4 space-y-4">
          {!isLogin && (
            <motion.input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-3 border rounded-lg" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
          {!isLogin && (
            <motion.input 
              type="password" 
              placeholder="Confirm Password" 
              className="w-full p-3 border rounded-lg" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-lime-700"
          >
            {isLogin ? "Login" : "Register"}
          </motion.button>
        </div>
        <p className="text-center text-sm text-gray-800 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button onClick={() => setIsLogin(!isLogin)} className="text-lime-700 hover:underline ml-1">
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}