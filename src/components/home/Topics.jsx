import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaHeart } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import groupService from '../../services/groupService';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';


export default function Topics() {

    const { loading, state: topics } = useFetch(groupService.getLatest)
    const navigate = useNavigate()
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
                    <div key={topic._id} className="px-3">
                        <Link
                            to={`/groups/${topic._id}/chat`}
                            state={{
                                groupName: topic.groupName,
                                groupLocation: topic.location,
                                rules: topic.rules,
                                description: topic.description
                            }}>
                            <div className="p-6 bg-white border-2 border-gray-800 shadow-lg rounded-xl text-center relative">
                                <h3 className="text-lg font-semibold">{topic.groupName}</h3>
                                <p className="text-gray-500">{topic.joinedGroup.length} members</p>
                                <div className="absolute bottom-3 right-3 flex items-center space-x-1">
                                    <button
                                        onClick={(e) => handleLike(e, topic.id)}
                                        className="focus:outline-none"
                                    >
                                        <FaHeart size={25} className={`cursor-pointer transition-transform duration-200 
                                        ${topic.liked
                                                ?
                                                'text-red-500 scale-110 font-bold'
                                                :
                                                'text-gray-300 hover:scale-110 font-bold'
                                            }`} />
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
