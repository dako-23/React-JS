import { useContext, } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader.jsx';
import SuccessToast from '../notifications/SuccessToast.jsx';
import ProfileForm from './ProfileForm.jsx';
import ErrorToast from '../notifications/ErrorToast.jsx';
import { useMyProfile } from '../../hooks/useMyProfile.js';

export default function MyProfile() {
    
    const { _id: userId, email, } = useContext(UserContext);
    const { FormAction, showNotify, showNotifyErr, user, setShowNotify, setShowNotifyErr, loading, isPending } = useMyProfile(userId)
    const navigate = useNavigate()

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
                        isLocked={isPending}
                        onCancel={() => navigate('/')}
                    />
                </>
            }
        </div>
    );
}

