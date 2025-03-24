import { useActionState, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import { useCreateProfileInfo, useGetUser } from '../../api/authApi.js';
import useFetch from '../../hooks/useFetch.js';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader.jsx';
import SuccessToast from '../notifications/SuccessToast.jsx';
import ProfileForm from './ProfileForm.jsx';
import ErrorToast from '../notifications/ErrorToast.jsx';
import { useMyProfile } from '../../hooks/useMyProfile.js';

export default function MyProfile() {
    const { _id: userId, username, email, isAuth, } = useContext(UserContext);
    const { handleSubmitForm, isLocked, showNotify, showNotifyErr, user, setShowNotify, setShowNotifyErr, loading, v } = useMyProfile(userId)
    const navigate = useNavigate()

    const [values, FormAction, isPending] = useActionState(handleSubmitForm, { firstName: '', lastName: '', address: '', imageUrl: '' })


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

