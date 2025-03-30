import request from "../utils/request.js";
import * as yup from "yup";

const API_URL = 'https://server-tgjz.onrender.com/users';

export const useLogin = () => {

    const validationLoginSchema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const login = async (email, password) => {
        const data = request.post(
            `${API_URL}/login`,
            { email, password },
        )
        return data;
    }

    return { login, validationLoginSchema };
};

export const useRegister = () => {

    const validationRegisterSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        rePassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords do not match")
            .required("Confirm password is required"),
    });

    const register = async (userData) => {
        const data = request.post(
            `${API_URL}/register`,
            userData
        )
        return data;
    }

    return { register, validationRegisterSchema };
}

export const useCreateProfileInfo = () => {
    const createProfileInfo = async (userId, updateData) => {
        const data = request.put(
            `${API_URL}/${userId}`,
            updateData
        )
        return data;
    }
    return { createProfileInfo }
}

export const useGetUser = () => {

    const getUser = async (userId) => {

        return request.get(`${API_URL}/${userId}`);
    }

    return {
        getUser,
    }

};

export const useChangePassword = () => {

    const changePassword = async (currentPassword, newPassword) => {
        return request.post(
            `${API_URL}/change-password`,
            { currentPassword, newPassword },
        )
    }
    return {
        changePassword
    }
}