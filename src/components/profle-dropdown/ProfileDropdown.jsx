import { useState, useContext, useRef, useEffect } from "react";
import { FaEdit, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaUserCircle, FaFileAlt, FaUsers, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function ProfileDropdown() {
    const { isAuth, imageUrl, userLogoutHandler, _id: userId } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen((isOpen) => !isOpen)} className="focus:outline-none">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-800 object-cover"
                    />
                ) : (
                    <FaUserCircle size={32} className="text-gray-800" />
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-page-pattern shadow-lg rounded-lg py-2 border border-gray-200 z-50">

                    {isAuth ? (
                        <>
                            <button
                                onClick={() => {
                                    navigate(`/${userId}/my-groups`);
                                    setIsOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                                <FaUsers className="mr-2" /> My groups
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/my-profile");
                                    setIsOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                                <FaEdit className="mr-2" /> Edit Profile
                            </button>
                            <button
                                onClick={() => {
                                    userLogoutHandler();
                                    navigate("/");
                                    setIsOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    navigate("/users/login");
                                    setIsOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                                <FaSignInAlt className="mr-2" /> Login
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/users/register");
                                    setIsOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                                <FaUserPlus className="mr-2" /> Register
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
