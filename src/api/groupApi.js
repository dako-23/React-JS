import request from "../utils/request.js";
const API_URL = 'https://server-tgjz.onrender.com/groups';


export const useGroup = () => {

    const getAll = async () => {
        return request.get(`${API_URL}`);
    };

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
        );;
    };

    const groupDelete = async (groupId) => {
        return request.delete(`${API_URL}/${groupId}/delete`)
    };

    return {
        getAll,
        getOne,
        getLatest,
        create,
        joinGroup,
        leaveGroup,
        editGroup,
        groupDelete
    }
}
