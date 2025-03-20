import { useState, useEffect, useContext } from "react";
import request from "../utils/request.js";
import { UserContext } from "../contexts/UserContext.jsx";

const API_URL = 'https://server-tgjz.onrender.com/groups';



export const useGroup = () => {
    
    const getOne = async (groupId) => {
        return request.get(`${API_URL}/${groupId}`)
    };

    const getLatest = async () => {
        return request.get(`${API_URL}/latest`)
    };

    const create = async (groupData) => {
        return request.post(
            `${API_URL}/create`,
            groupData
        );
    };

    const joinGroup = async (groupId) => {
        return request.post(`${API_URL}/${groupId}/join`)
    };

    const leaveGroup = async (groupId) => {
        return request.post(`${API_URL}/${groupId}/leave`)
    };

    const editGroup = async (groupId, updatedData) => {
        return request.put(`${API_URL}/${groupId}/edit`,
            updatedData
        );
    };

    const groupDelete = async (groupId) => {

        return request.delete(`${API_URL}/${groupId}/delete`)
    };

    return {
        getOne,
        getLatest,
        create,
        joinGroup,
        leaveGroup,
        editGroup,
        groupDelete
    }
}

export const useGroupGetAll = () => {

    const [groups, setGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const { _id: userId } = useContext(UserContext);

    const getAll = async () => {
        try {
            setLoading(true);
            const result = await request.get(`${API_URL}`);
            setGroups(result);

            if (userId) {
                const userJoinedGroups = result
                    .filter(group => group.joinedGroup.includes(userId))
                    .map(group => group._id);
                setJoinedGroups(userJoinedGroups);
            }

            return result;
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAll();
    }, [userId]);

    return {
        groups,
        joinedGroups,
        setJoinedGroups,
        setGroups,
        getAll,
        loading
    };
};
