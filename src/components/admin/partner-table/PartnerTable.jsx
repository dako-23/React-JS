import { FaPlusCircle, FaTrash } from "react-icons/fa";
import AddPartner from "./AddPartner.jsx";

export default function PartnerTable({
    currentData,
    postAction,
    showModal,
    setShowModal,
    isPostPending,
    handleDelete
}) {

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Partner List</h3>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    <FaPlusCircle /> Add Partner
                </button>
            </div>
            {showModal && (
                <AddPartner
                    onClose={() => setShowModal(false)}
                    postAction={postAction}
                    isPending={isPostPending}
                />
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-page-pattern border border-gray-200 shadow rounded-xl">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm text-gray-700 uppercase">
                            <th className="p-3">Logo</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Website</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((partner) => (
                            <tr key={partner._id} className="border-t border-gray-100 hover:bg-gray-50">
                                <td className="p-3">
                                    <img src={partner.logo} alt={partner.name} className="w-14 h-14 rounded object-contain" />
                                </td>
                                <td className="p-3 font-medium">{partner.name}</td>
                                <td className="p-3 text-blue-600 underline">
                                    <a
                                        href={partner.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {partner.url}
                                    </a>
                                </td>
                                <td className="p-3 text-right">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(partner._id)}
                                        className="text-red-600 hover:text-red-400"
                                        title="Delete partner"
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
