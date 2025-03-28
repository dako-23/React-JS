import { useActionState, useContext, useEffect, useState } from 'react';
import { useCreateProfileInfo, useGetUser } from '../api/authApi.js';
import useFetch from './useFetch.js';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useToast } from './useToast.js';

export function useMyProfile(userId) {

    const { updateUserPartial } = useContext(UserContext)

    const [isLocked, setIsLocked] = useState(false);
    const [showNotify, setShowNotify] = useState(false)
    const [showNotifyErr, setShowNotifyErr] = useState(false)
    const [user, setUser] = useState([]);
    const { createProfileInfo } = useCreateProfileInfo()
    const navigate = useNavigate()
    const { info } = useToast()

    const handleSubmitForm = async (prevState, formData) => {
        setIsLocked(true)

        const updateData = Object.fromEntries(formData);

        updateUserPartial({ imageUrl: updateData.imageUrl, firstName: updateData.firstName, lastName: updateData.lastName })

        try {
            const result = await createProfileInfo(userId, updateData)
            setUser(result)

            setTimeout(() => (setIsLocked(false), setShowNotify(true)), 1000);
            setTimeout(() => (info('Redirect...')), 1850);
            setTimeout(() => (navigate('/')), 3000);

        } catch (err) {
            setTimeout(() => {
                setIsLocked(false);
                setShowNotifyErr(true);
            }, 1500);
        }
    }

    const [values, FormAction, isPending] = useActionState(handleSubmitForm, { firstName: '', lastName: '', address: '', imageUrl: '' })

    const { getUser } = useGetUser()

    const { loading, state: fetchedUser } = useFetch(() => getUser(userId));

    useEffect(() => {
        setUser(fetchedUser);
        setShowNotify(false)
    }, [fetchedUser]);

    return {
        isLocked,
        showNotify,
        showNotifyErr,
        user,
        FormAction,
        setShowNotify,
        setShowNotifyErr,
        loading,
    }

}