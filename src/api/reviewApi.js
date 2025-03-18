import request from "../utils/request.js";


const API_URL = 'https://server-tgjz.onrender.com/reviews';


export const useReviewCreate = () => {

    const create = async (reviewData) => {

        return request.post(
            `${API_URL}/create`,
            reviewData
        );
    }

    return {
        create,
    }

}