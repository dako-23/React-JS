import { useActionState, useContext, useEffect, useState } from 'react';
import { useCreateProfileInfo, useGetUser } from '../api/authApi.js';
import useFetch from './useFetch.js';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useToast } from './useToast.js';

export function useMyProfile(userId) {

    const { updateUserPartial } = useContext(UserContext)
    const [showNotify, setShowNotify] = useState(false);
    const [showNotifyErr, setShowNotifyErr] = useState(false);
    const [user, setUser] = useState([]);
    const { createProfileInfo } = useCreateProfileInfo();
    const navigate = useNavigate();
    const { info } = useToast();

    const handleSubmitForm = async (_, formData) => {

        const updateData = Object.fromEntries(formData);

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        try {
            const result = await createProfileInfo(userId, updateData);
            setUser(result);

            await delay(500);
            setShowNotify(true);

            await delay(850);
            info('Redirect...');

            await delay(1150);
            navigate('/');
        } catch (err) {
            setShowNotifyErr(true);
        }

        updateUserPartial({ imageUrl: updateData.imageUrl, firstName: updateData.firstName, lastName: updateData.lastName })

    }

    const [_, FormAction, isPending] = useActionState(handleSubmitForm, { firstName: '', lastName: '', address: '', imageUrl: '' })

    const { getUser } = useGetUser()

    const { loading, state: fetchedUser } = useFetch(() => getUser(userId));

    useEffect(() => {
        setUser(fetchedUser);
        setShowNotify(false)
    }, [fetchedUser]);

    return {
        showNotify,
        showNotifyErr,
        user,
        FormAction,
        setShowNotify,
        setShowNotifyErr,
        loading,
        isPending
    }

}