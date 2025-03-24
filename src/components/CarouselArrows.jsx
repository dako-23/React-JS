import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const NextArrow = ({ onClick }) => (
    <div className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 cursor-pointer text-gray-800 hover:text-gray-600 transition-all" onClick={onClick}>
        <FaChevronRight size={24} />
    </div>
);

export const PrevArrow = ({ onClick }) => (
    <div className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 cursor-pointer text-gray-800 hover:text-gray-600 transition-all" onClick={onClick}>
        <FaChevronLeft size={24} />
    </div>
);
