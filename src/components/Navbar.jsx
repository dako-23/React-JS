import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";


export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const textVariants = {
        hidden: { y: -150, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                bounce: 0.1,
                delay: 0.3,
            },
        },
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (<motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-opacity-40 backdrop-blur-md z-10 h-14"
    >
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-lime-200 bg-opacity-40 backdrop-blur-md z-10 h-14">

            <div className="flex items-center">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-20 h-auto"
                />
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? (
                        <AiOutlineClose className="text-2xl text-black" />
                    ) : (
                        <AiOutlineMenu className="text-2xl text-black" />
                    )}
                </button>
            </div>

            <ul
                className={`md:flex md:items-center md:space-x-6 text-gray-800 font-medium ${isMobileMenuOpen
                    ? "flex flex-col absolute top-16 right-0 w-full bg-lime-200 bg-opacity-40 backdrop-blur-md px-4 py-6 z-10"
                    : "hidden"
                    }`}>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <Link to="/" onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        setIsMobileMenuOpen(false)
                    }}>Home</Link>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/login">Login</Link>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/register">Register</Link>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/groups">Groups</Link>
                </li>
                {/* <li className="hover:text-lime-700 py-2 md:py-0">
                    <a href="/about">About</a>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <a href="/contact">Contact</a>
                </li>  */}
            </ul>
        </nav>
    </motion.h1>
    )
}