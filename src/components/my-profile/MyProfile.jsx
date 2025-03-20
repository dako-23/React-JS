import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";

const MyProfile = () => {
    const { userId, username, email, isAuth } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [isLocked, setIsLocked] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSave = () => {
        console.log("Saving user data:", { firstName, lastName, address });
    };

    return (
        <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100">
           <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
            >
                <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">My Profile</h2>
                <div className="flex flex-col items-center">
                    <label htmlFor="profilePic" className="cursor-pointer">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border border-gray-300 object-cover" />
                        ) : (
                            <div className="w-24 h-24 flex items-center text-center justify-center border border-gray-300 rounded-full bg-gray-100 text-gray-500 text-sm">
                                Upload a photo
                            </div>
                        )}
                    </label>
                    <input type="file" id="profilePic" className="hidden" onChange={handleImageChange} />
                    <p className="text-sm text-gray-500 mt-2">Click to change</p>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        className={`mt-1 w-full p-2 border rounded-lg ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        readOnly={isLocked}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        className={`mt-1 w-full p-2 border rounded-lg ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        readOnly={isLocked}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                        value={email}
                        readOnly
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        className="mt-1 w-full p-2 border rounded-lg"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                    <button 
                        className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700" 
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default MyProfile;
