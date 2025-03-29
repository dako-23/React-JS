import { useEffect, useState } from 'react';
import { useReviewCreate, useReviewGetLatest } from '../api/reviewApi.js';
import useFetch from './useFetch.js';


export function useReviews() {

    const [reviews, setReviews] = useState([])
    const [showCreateReview, setShowCreateReview] = useState(false)

    const { create } = useReviewCreate();
    const { getLatest } = useReviewGetLatest();

    const { loading, state: fetchedReviews } = useFetch(getLatest);

    useEffect(() => {
        setReviews(fetchedReviews);
    }, [fetchedReviews]);

    const openCreateReviewModal = () => {
        setShowCreateReview(true);
    };

    const closeCreateReviewModal = () => {
        setShowCreateReview(false);
    };

    const handleCreateReview = async (reviewData) => {

        if (reviewData.username === '' || reviewData.review === '') return

        try {
            const newReview = await create({
                ...reviewData,
                rating: Number(reviewData.rating) || 1,
            });

            setReviews((prev) => [newReview, ...prev]);
            closeCreateReviewModal();
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    return {
        closeCreateReviewModal,
        openCreateReviewModal,
        showCreateReview,
        handleCreateReview,
        loading,
        reviews
    }
}

export function useReviewsCreate(onSubmitCreate) {

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const inputClass = 'w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-600'

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleSubmitReview = (prevState, formData) => {
        const values = Object.fromEntries(formData);
        values.rating = rating || 1

        onSubmitCreate(values);

        return values
    }

    return {
        hoverRating,
        setHoverRating,
        inputClass,
        handleRatingClick,
        handleSubmitReview,
        rating
    }
}