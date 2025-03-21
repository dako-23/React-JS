import { motion } from 'framer-motion';
import { useActionState, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import { FaUser } from 'react-icons/fa';
import { useCreateProfileInfo, useGetUser } from '../../api/authApi.js';
import useFetch from '../../hooks/useFetch.js';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader.jsx';
import SuccessToast from '../notifications/SuccessToast.jsx';

const MyProfile = () => {
    const { _id: userId, username, email, isAuth, } = useContext(UserContext);
    const [isLocked, setIsLocked] = useState(false);
    const [showNotify, setShowNotify] = useState(false)
    const navigate = useNavigate()

    const [user, setUser] = useState([]);
    const { createProfileInfo } = useCreateProfileInfo()

    const handleSubmitForm = async (prevState, formData) => {
        setIsLocked(true)
        const updateData = Object.fromEntries(formData);

        const result = await createProfileInfo(userId, updateData)
        setUser(result)

        setTimeout(() => (setIsLocked(false), setShowNotify(true)), 1500);
        return values
    }

    const [values, FormAction, isPending] = useActionState(handleSubmitForm, { firstName: '', lastName: '', address: '', imageUrl: '' })

    const { getUser } = useGetUser()

    const { loading, state: fetchedUser } = useFetch(() => getUser(userId));

    useEffect(() => {
        setUser(fetchedUser);
        setShowNotify(false)
    }, [fetchedUser]);

    return (
        <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100 relative">
            {loading
                ?
                <Loader />
                :
                <>
                    {showNotify &&
                        <SuccessToast
                            message={'Profile update successfully!'}
                            show={setShowNotify}
                        />}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-page-pattern w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
                    >
                        <h2 className="text-2xl font-semibold text-center h-14 text-gray-800">My Profile</h2>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-gray-800 bg-gray-200 shadow-md overflow-hidden">
                                {user.imageUrl ? (
                                    <img
                                        src={user.imageUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUser className="text-gray-600 text-5xl" />
                                )}
                            </div>
                        </div>
                        <form action={FormAction} className="space-y-4">
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    className={`mt-1 w-full p-2 border rounded-lg ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    name='firstName'
                                    placeholder="Enter your first name"
                                    defaultValue={user.firstName}
                                    disabled={isLocked}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    className={`mt-1 w-full p-2 border rounded-lg ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    name='lastName'
                                    placeholder="Enter your last name"
                                    defaultValue={user.lastName}
                                    disabled={isLocked}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                                    // name='email'
                                    defaultValue={email}
                                    disabled={true}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    className={`mt-1 w-full p-2 border rounded-lg ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    name='address'
                                    placeholder="Enter your address"
                                    defaultValue={user.address}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Upload a photo</label>
                                <input
                                    className={`mt-1 w-full p-2 border rounded-lg ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    placeholder="Image Url"
                                    defaultValue={user.imageUrl}
                                    disabled={isLocked}
                                />
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
                                    onClick={() => navigate('/')}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 ${isLocked && "cursor-not-allowed"}`}
                                    disabled={isLocked}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            }
        </div>
    );
};

export default MyProfile;
