import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from '../../hooks/useFetch';
import { useGroup } from '../../api/groupApi.js';
import { UserContext } from '../../contexts/UserContext.jsx';
import { toast } from 'react-toastify';
import { NextArrow, PrevArrow } from '../CarouselArrows.jsx';
import Loader from '../Loader.jsx';

export default function Topics() {
    const { getLatest } = useGroup()
    const { loading, state: topics } = useFetch(getLatest)
    const { _id: userId } = useContext(UserContext)
    const navigate = useNavigate();

    const handleClick = (group) => {

        const isUserJoined = (group) => {
            return group.joinedGroup.includes(userId);
        };

        if (!isUserJoined(group)) {
            toast.info("You need to join the group first!");
            return navigate("/groups");
        }

        navigate(`/groups/${group._id}/chat`);
    };

    const settings = {
        dots: topics.length > 1,
        arrows: topics.length > 1,
        infinite: topics.length > 1,
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
            {loading
                ?
                <Loader />
                :
                <Slider {...settings}>
                    {topics.map((topic) => (
                        <div key={topic._id} className="px-3">
                            <div
                                onClick={() => handleClick(topic)}
                                className="cursor-pointer p-6 bg-gradient-to-r from-lime-100 to-green-200 border-2 border-gray-800 shadow-lg rounded-xl text-center relative">
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
                                    <span className="px-3 py-1 text-sm font-medium text-teal-700 bg-gradient-to-r from-lime-400 to-amber-200 rounded-full">
                                        {topic.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </Slider >}

        </div >
    );
}
