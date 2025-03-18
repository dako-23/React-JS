import React, { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from '../../hooks/useFetch.js';
import Loader from '../Loader.jsx';
import CreateReview from './CreateReview.jsx';
import { useReviewCreate, useReviewGetLatest } from '../../api/reviewApi.js';
import { useCallback } from 'react';

const NextArrow = ({ onClick }) => (
  <div className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 cursor-pointer text-gray-800 hover:text-gray-600 transition-all" onClick={onClick}>
    <FaChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 cursor-pointer text-gray-800 hover:text-gray-600 transition-all" onClick={onClick}>
    <FaChevronLeft size={24} />
  </div>
);

const ratingOptions = [1, 2, 3, 4, 5];

export default function Reviews({

}) {
  const [reviews, setReviews] = useState([])
  const [showCreateReview, setShowCreateReview] = useState(false)

  const { create } = useReviewCreate();
  const { getLatest } = useReviewGetLatest();
  
  const getLatestCallback = useCallback(() => getLatest(), []);

  const navigate = useNavigate()

  const { loading, state: fetchedReviews } = useFetch(getLatestCallback);

  useEffect(() => {
    setReviews(fetchedReviews);
  }, [fetchedReviews]);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

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
      console.error("Error creating review:", error);
    }
  };

  return (
    <>
      {showCreateReview && <CreateReview
        ratingOptions={ratingOptions}
        onClose={closeCreateReviewModal}
        onSubmitCreate={handleCreateReview}
      />}

      <div className="max-w-3xl mx-auto py-10 relative">
        <div className="bg-page-pattern flex items-center justify-center my-8 gap-4">
          <div className="h-[2px] w-80 bg-gray-800"></div>
          <h2 className="text-center text-2xl font-bold mb-1">💖</h2>
          <div className="h-[2px] w-80 bg-gray-800"></div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">What Moms Are Saying</h2>
        {loading ?
          (<Loader />)
          : reviews.length === 0
            ? (<p className="text-center text-gray-600 text-lg mt-4 font-bold">No reviews yet. Be the first to leave your feedback!</p>)
            : (<Slider {...settings}>

              {reviews.slice(0, 3).map((review) => (
                <div key={review._id} className="px-3">
                  <div className="p-6 bg-white border-2 border-gray-800 shadow-lg rounded-xl text-center">
                    <p className="text-lg font-semibold">{review.username}</p>
                    <p className="text-gray-600 mt-2">{review.review}</p>
                    <div className="flex justify-center mt-2">

                      {ratingOptions.map((star) => (
                        <FaStar
                          key={star}
                          size={20}
                          className={star <= review.rating ? "text-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            </Slider>
            )}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={openCreateReviewModal}
            className="px-5 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-600 transition">
            Add Review
          </button>
          <button
            className="px-5 py-2 bg-gradient-to-r from-lime-200 hover:to-green-300 text-gray-800 font-semibold rounded-lg hover:from-lime-100 to-green-200 transition"
            onClick={() => navigate("/reviews")}
          >
            View All Reviews
          </button>
        </div>
      </div>
    </>
  );
}
