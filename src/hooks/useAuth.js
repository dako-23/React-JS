import { useActionState, useContext, useState } from "react";
import { useToast } from "./useToast.js";
import { useChangePassword, useLogin, useRegister } from "../api/authApi.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";

export default function useAuth() {

    const { error: errToast, success, info, warn } = useToast();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState({
        username: false,
        email: false,
        current: false,
        new: false,
        confirm: false
    });
    const { changePassword, validationChangePasswordSchema } = useChangePassword();
    const { login, validationLoginSchema } = useLogin();
    const { register, validationRegisterSchema } = useRegister();
    const { userLoginHandler } = useContext(UserContext);

    const navigate = useNavigate();

    const toggleVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const registerSubmitHandler = async (prevState, formData) => {
        const valuesRegister = Object.fromEntries(formData);
        valuesRegister.agreeToTerms = formData.get("agreeToTerms") === "on";
        
        const userData = { username: valuesRegister.username, email: valuesRegister.email, password: valuesRegister.password };

        try {
            setError(null);

            await validationRegisterSchema.validate(valuesRegister, { abortEarly: false });

            const authData = await register(userData);

            userLoginHandler(authData)

            navigate('/my-profile/edit');
            return valuesRegister;
        } catch (err) {

            if (err.inner) {
                const errorMessages = {};
                err.inner.forEach(e => {
                    errorMessages[e.path] = e.message;
                });
                setError(errorMessages);
            } else {
                errToast(err.message)
            }
            return valuesRegister;
        }
    };

    const [valuesRegister, registerAction, isRegisterPending] = useActionState(registerSubmitHandler, {
        username: '',
        email: '',
        password: '',
        rePassword: '',
        agreeToTerms: false
    });

    const LoginSubmitHandler = async (prevState, formData) => {
        const valuesLogin = Object.fromEntries(formData);

        try {
            setError(null);

            await validationLoginSchema.validate(valuesLogin, { abortEarly: false });

            const authData = await login(valuesLogin.email, valuesLogin.password);

            if (authData.isBlocked) {
                warn('Your account has been blocked by the administrators.');
                return navigate('/');
            }

            userLoginHandler(authData)

            navigate('/');

            return valuesLogin;
        } catch (err) {

            if (err.inner) {
                const errorMessages = {};
                err.inner.forEach(e => {
                    errorMessages[e.path] = e.message;
                });
                setError(errorMessages);
            } else {
                errToast(err.message)
            }

            return valuesLogin;
        }
    };

    const [valuesLogin, loginAction, isLoginPending] = useActionState(LoginSubmitHandler,
        {
            email: '',
            password: ''
        });

    const changePasswordHandler = async (prevState, formData) => {
        setError(null)

        const values = Object.fromEntries(formData);
        const { currentPassword, newPassword } = values

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        try {
            await validationChangePasswordSchema.validate(values, { abortEarly: false });

            await changePassword(currentPassword, newPassword)

            await delay(500)
            success('Password changed successfully!')

            await delay(1200);
            info('Redirect...');

            await delay(1500);
            navigate('/');

        } catch (err) {
            if (err.inner) {
                const errorMessages = {};
                err.inner.forEach(e => {
                    errorMessages[e.path] = e.message;
                });
                setError(errorMessages);
            } else {
                errToast(err.message)
            }
        }
    }

    const [_, changePasswordAction, isChangePending] = useActionState(changePasswordHandler,
        {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });

    return {
        error,
        setError,
        showPassword,
        toggleVisibility,
        changePasswordAction,
        isChangePending,
        isLoginPending,
        loginAction,
        valuesLogin,
        isRegisterPending,
        registerAction,
        valuesRegister
    }

}
