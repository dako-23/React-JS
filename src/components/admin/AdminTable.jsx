import { FaSearch, FaUser } from "react-icons/fa";
import Pagination from "../pagination/Pagination.jsx";
import { usePagination } from "../../hooks/usePagination.js";
import useUsers from "../../hooks/useUsers.js";
import UserTable from './user-table/UserTable.jsx'
import { useState } from "react";
import PartnerTable from "./partner-table/PartnerTable.jsx";
import usePartners from "../../hooks/usePartners.js";

export default function AdminTable() {

    const [activeTable, setActiveTable] = useState("users");
    const { handleToggleAdmin, handleToggleBlock, filteredPosts, setUserSearch, userSearch } = useUsers();
    const { filteredPartners, postAction, showModal, setShowModal, isPostPending, setPartnerSearch, partnerSearch, handleDelete } = usePartners();
    const { currentPage, totalPages, currentData, changePage } = usePagination(activeTable === "users" ? filteredPosts : filteredPartners, 10)

    return (
        <div className="mt-10">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setActiveTable("users")}
                    className={`px-4 py-2 rounded font-semibold ${activeTable === "users" ? "bg-lime-600 text-white" : "bg-gray-200"}`}
                >
                    Users
                </button>
                <button
                    onClick={() => setActiveTable("partners")}
                    className={`px-4 py-2 rounded font-semibold ${activeTable === "partners" ? "bg-lime-600 text-white" : "bg-gray-200"}`}
                >
                    Partners
                </button>
            </div>
            <div className="flex flex-col items-center justify-center mb-8">
                <h3 className="text-xl font-bold mb-4 text-center">{activeTable === 'users' ? 'User Management' : 'Partners Management'}</h3>
                <div className="flex items-center gap-2 w-full max-w-md">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder={activeTable === 'users' ? 'Search users...' : 'Search partners...'}
                        value={activeTable === 'users' ? userSearch : partnerSearch}
                        onChange={(e) => {
                            activeTable === 'users'
                                ? setUserSearch(e.target.value)
                                : setPartnerSearch(e.target.value);
                        }}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600 w-full bg-page-pattern"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                {activeTable === 'users' &&
                    <UserTable
                        currentData={currentData}
                        handleToggleAdmin={handleToggleAdmin}
                        handleToggleBlock={handleToggleBlock}
                    />}
                {activeTable === 'partners' &&
                    <PartnerTable
                        currentData={currentData}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        postAction={postAction}
                        isPostPending={isPostPending}
                        handleDelete={handleDelete}
                    />}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={changePage} />
            </div>
        </div>
    );
}
