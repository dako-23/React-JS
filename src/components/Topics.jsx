import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaHeart } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const initialTopics = [
    { id: 1, title: "Как да се справим с коликите?", comments: 45, likes: 0, liked: false, slug: 'cope-with-colic' },
    { id: 2, title: "Най-добрите детски книги за 2024", comments: 32, likes: 0, liked: false, slug: 'best-kids-books-2024' },
    { id: 3, title: "Кога да започнем захранването?", comments: 28, likes: 0, liked: false, slug: 'when-to-start-solid-food' },
    { id: 4, title: "Работа от вкъщи за майки", comments: 20, likes: 0, liked: false, slug: 'work-from-home-moms' },
];

export default function Topics() {
    const [topics, setTopics] = useState(initialTopics);

    const handleLike = (e, id) => {
        e.preventDefault();
        setTopics(topics.map(topic => {
            if (topic.id === id) {

                return topic.liked
                    ? { ...topic, likes: topic.likes - 1, liked: false }
                    : { ...topic, likes: topic.likes + 1, liked: true };
            }
            return topic;
        }));
    };

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

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className="max-w-5xl mx-auto py-10">
            <div className="bg-page-pattern flex items-center justify-center my-8 gap-4">
                <div className="h-[2px] w-80 bg-gray-800"></div>
                <h2 className="text-center text-2xl font-bold mb-1">🔥</h2>
                <div className="h-[2px] w-80 bg-gray-800"></div>
            </div>
            <h2 className="text-gray-800 text-center text-2xl font-bold mb-6">Trending Topics</h2>
            <Slider {...settings}>
                {topics.map((topic) => (
                    <div key={topic.id} className="px-3">
                        <Link to={`/topic/${topic.slug}`}>
                            <div className="p-6 bg-white border-2 border-gray-800 shadow-lg rounded-xl text-center">
                                <h3 className="text-lg font-semibold">{topic.title}</h3>
                                <p className="text-gray-500">{topic.comments} коментара</p>
                                <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                                    <button
                                        onClick={(e) => handleLike(e, topic.id)}
                                        className="focus:outline-none"
                                    >
                                        <FaHeart className={`cursor-pointer text-red-500 ${topic.liked ? 'opacity-100' : 'opacity-30'}`} />
                                    </button>
                                    <span>{topic.likes}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
