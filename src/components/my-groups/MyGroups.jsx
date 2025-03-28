import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useGroup } from "../../api/groupApi.js";
import useFetch from "../../hooks/useFetch.js";
import Loader from "../Loader.jsx";


export default function MyGroups() {

    const { getByOwner } = useGroup()

    const { loading, state: groups } = useFetch(getByOwner)

    return (

        <div className="max-w-4xl mx-auto py-20 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                My Groups
            </h2>
            {loading ? <Loader /> : groups.length === 0 ? (
                <div className="text-center text-gray-500 border border-dashed border-gray-300 py-10 rounded-lg">
                    You haven't created any groups yet.
                </div>
            ) : (
                <ul className="max-w-4xl mx-auto py-12 px-4 space-y-6">
                    {groups.map((group) => (
                        <li
                            key={group._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{group.groupName}</h3>
                                    <p className="text-sm text-gray-500">Members: {group.joinedGroup?.length || 0}</p>
                                </div>
                                <span className="bg-lime-100 text-lime-700 text-sm px-3 py-1 rounded-full font-medium">
                                    {group.category}
                                </span>
                            </div>
                            {group.imageUrl && (
                                <img
                                    src={group.imageUrl}
                                    alt={group.groupName}
                                    className="w-full h-52 object-cover rounded-lg border mb-4"
                                />
                            )}

                            {group.description && (
                                <p className="text-gray-700 text-sm mb-4">{group.description}</p>
                            )}

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => editGroup(group)}
                                    className="text-sm px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
                                >
                                    <AiOutlineEdit className="inline mr-1" /> Edit
                                </button>
                                <button
                                    onClick={() => deleteGroup(group._id, group.groupName)}
                                    className="text-sm px-4 py-2 border rounded-md text-red-600 border-red-300 hover:bg-red-50 transition"
                                >
                                    <AiOutlineDelete className="inline mr-1" /> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}