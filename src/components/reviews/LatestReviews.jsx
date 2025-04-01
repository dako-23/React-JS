import React, { useContext } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from '../CarouselArrows.jsx';
import Loader from '../Loader.jsx';
import CreateReview from './CreateReview.jsx';
import { useReviews } from '../../hooks/useReviews.js';
import { UserContext } from '../../contexts/UserContext.jsx';
import { useToast } from '../../hooks/useToast.js';

const ratingOptions = [1, 2, 3, 4, 5];

export default function LatestReviews() {

  const
    {
      reviewAction,
      isPending,
      loading,
      reviews,
      showCreateReview,
      openCreateReviewModal,
      closeCreateReviewModal,
      values,
      hoverRating,
      rating,
      setHoverRating,
      handleRatingClick,
      settings
    } = useReviews()

  const sliderSettings = {
    ...settings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }

  const { isAuth } = useContext(UserContext);
  const { info } = useToast()
  const navigate = useNavigate()

  return (
    <>
      {showCreateReview && <CreateReview
        ratingOptions={ratingOptions}
        onClose={closeCreateReviewModal}
        reviewAction={reviewAction}
        values={values}
        isPending={isPending}
        handleRatingClick={handleRatingClick}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
        rating={rating}
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
            : (<Slider {...sliderSettings}>

              {reviews.slice(0, 3).map((review) => (
                <div key={review._id} className="px-3">
                  <div className="p-6 bg-gradient-to-r from-green-200 to-lime-100 border-2 border-gray-800 shadow-lg rounded-xl text-center">
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
                    <p className="text-sm text-gray-500 mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>

                  </div>
                </div>
              ))}

            </Slider>
            )}
        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={() => isAuth ? openCreateReviewModal() : info('You need to log in first.') && navigate('/users/login')}
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
