import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaHeart } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useFetch from '../../hooks/useFetch';
import { useGroup } from '../../api/groupApi.js';


export default function Topics() {
    const { getLatest } = useGroup()

    const { loading, state: topics } = useFetch(getLatest)


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
                            to={'/groups'}>
                            <div className="p-6 bg-gradient-to-r from-lime-100 to-green-200 border-2 border-gray-800 shadow-lg rounded-xl text-center relative">
                                <div className="flex items-center space-x-3 mb-2">
                                    <img
                                        src={topic.imageUrl}
                                        alt={topic.groupName}
                                        className="w-28 h-28 rounded-full object-cover border border-gray-300"
                                    />
                                    <div className='text-center flex-1'>
                                        <h3 className="text-lg font-semibold">{topic.groupName}</h3>
                                        <p className="text-gray-500">{topic.joinedGroup.length} members</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
