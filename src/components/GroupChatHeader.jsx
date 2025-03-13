import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

export default function GroupChatHeader() {
    const navigate = useNavigate()
    const location = useLocation();
    const { groupName, groupLocation, rules, description } = location.state

    return (
        <div className="relative flex items-center justify-center py-3 px-6 bg-page-pattern rounded-t-xl border-gray-300">
            <div className='absolute left-5 group'>
                <button
                    onClick={() => navigate('/groups')}
                    className="p-2 text-red-700 hover:text-red-500 transition">
                    <FaSignOutAlt size={20} />
                </button>
            </div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span>💬</span> {groupName}
            </h2>
            <div className="absolute right-5 group">
                <button className="p-2 text-gray-800 hover:text-gray-600 transition">
                    <IoInformationCircle size={26} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-64 bg-page-pattern text-gray-800 p-3 rounded-lg shadow-lg border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-sm mt-1"><span className="font-semibold">Description:</span> {description || 'No description provided.'}</p>
                    <p className="text-sm mt-1"><span className="font-semibold">Rules:</span> {rules || "No specific rules."}</p>
                    <p className="text-sm mt-1"><span className="font-semibold">Location:</span> {groupLocation || 'Not specified.'}</p>
                </div>
            </div>
        </div>
    );
}