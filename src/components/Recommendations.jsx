import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  { id: 1, name: "Мария Иванова", text: "Най-доброто място за майки! Намерих толкова нови приятелки." },
  { id: 2, name: "Елена Димитрова", text: "Организирахме страхотни срещи с другите майки!" },
  { id: 3, name: "Габриела Петрова", text: "Супер лесно е да споделяш моменти и да намериш съмишленици." },
];

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

export default function Recommendations() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="max-w-3xl mx-auto py-10 relative">
      <div className="bg-page-pattern flex items-center justify-center my-8 gap-4">
        <div className="h-[2px] w-80 bg-gray-800"></div>
        <h2 className="text-center text-2xl font-bold mb-1">💖</h2>
        <div className="h-[2px] w-80 bg-gray-800"></div>
      </div>
      <h2 className="text-center text-2xl font-bold mb-6"> Moms' reviews</h2>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="px-3">
            <div className="p-6 bg-white border-2 border-gray-800 shadow-lg rounded-xl text-center">
              <p className="text-lg font-semibold">{review.name}</p>
              <p className="text-gray-600 mt-2">{review.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
