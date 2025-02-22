import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Функции за отваряне/затваряне на мобилното меню
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-lime-200 bg-opacity-40 backdrop-blur-md z-10 h-14">
            {/* Лого */}
            <div className="flex items-center">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-20 h-auto"
                />
            </div>

            {/* Бутон за мобилно меню */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? (
                        <AiOutlineClose className="text-2xl text-black" />
                    ) : (
                        <AiOutlineMenu className="text-2xl text-black" />
                    )}
                </button>
            </div>

            {/* Навигационно меню */}
            <ul
                className={`md:flex md:items-center md:space-x-6 text-black font-medium ${isMobileMenuOpen
                    ? "flex flex-col absolute top-16 right-0 w-full bg-lime-200 bg-opacity-40 backdrop-blur-md px-4 py-6 z-10"
                    : "hidden"
                    }`}>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <a href="/login">Login</a>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <a href="/company">Company</a>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <a href="/home">Home</a>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <a href="/about">About</a>
                </li>
                <li className="hover:text-lime-700 py-2 md:py-0">
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    )
}