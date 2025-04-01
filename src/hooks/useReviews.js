import { useActionState, useEffect, useState } from 'react';
import { useReviewCreate, useReviewGetLatest } from '../api/reviewApi.js';
import useFetch from './useFetch.js';
import { useToast } from './useToast.js';

export function useReviews() {
    const [reviews, setReviews] = useState([]);
    const [showCreateReview, setShowCreateReview] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const { error, success } = useToast();

    const { create } = useReviewCreate();
    const { getLatest } = useReviewGetLatest();

    const { loading, state: fetchedReviews } = useFetch(getLatest);

    useEffect(() => {
        setReviews(fetchedReviews);
    }, [fetchedReviews]);

    const openCreateReviewModal = () => setShowCreateReview(true);
    const closeCreateReviewModal = () => setShowCreateReview(false);

    const handleCreateReview = async (_, formData) => {
        const values = Object.fromEntries(formData);

        if (!values.username || !values.review) {
            error('All fields are required!');
            return values;
        }

        try {
            const newReview = await create({
                ...values,
                rating: rating || 1,
            });

            setReviews((prev) => [newReview, ...prev]);
            success('Successfully posted your experience!');
            closeCreateReviewModal();
        } catch (err) {
            console.error('Error creating review:', err);
            error('Error creating review!')
        }

        return values;
    };

    const [values, reviewAction, isPending] = useActionState(handleCreateReview, {
        username: '',
        review: '',
        rating: '',
    });

    const settings = {
        dots: reviews.length > 1,
        arrows: reviews.length > 1,
        infinite: reviews.length > 1,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    return {
        closeCreateReviewModal,
        openCreateReviewModal,
        showCreateReview,
        reviews,
        loading,
        rating,
        setRating,
        hoverRating,
        setHoverRating,
        reviewAction,
        isPending,
        values,
        handleRatingClick,
        settings
    };
}
