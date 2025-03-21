import { useActionState, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import { useCreateProfileInfo, useGetUser } from '../../api/authApi.js';
import useFetch from '../../hooks/useFetch.js';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader.jsx';
import SuccessToast from '../notifications/SuccessToast.jsx';
import ProfileForm from './ProfileForm.jsx';
import ErrorToast from '../notifications/ErrorToast.jsx';

export default function MyProfile() {
    const { _id: userId, username, email, isAuth, } = useContext(UserContext);
    const [isLocked, setIsLocked] = useState(false);
    const [showNotify, setShowNotify] = useState(false)
    const [showNotifyErr, setShowNotifyErr] = useState(false)
    const [user, setUser] = useState([]);
    const { createProfileInfo } = useCreateProfileInfo()
    const navigate = useNavigate()

    const handleSubmitForm = async (prevState, formData) => {
        setIsLocked(true)
        const updateData = Object.fromEntries(formData);

        try {
            const result = await createProfileInfo(userId, updateData)
            setUser(result)

            setTimeout(() => (setIsLocked(false), setShowNotify(true)), 1500);
        } catch (err) {
            setTimeout(() => {
                setIsLocked(false);
                setShowNotifyErr(true);
            }, 1500);
        }
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
                    {showNotifyErr &&
                        <ErrorToast
                            message={'Profile update failed!'}
                            show={setShowNotifyErr}
                        />}
                    <ProfileForm
                        user={user}
                        email={email}
                        FormAction={FormAction}
                        isLocked={isLocked}
                        onCancel={() => navigate('/')}
                    />
                </>
            }
        </div>
    );
}

