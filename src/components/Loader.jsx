import React from "react";

export default function Loader() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-800"></div>
            <p className="mt-2 text-gray-700 font-medium text-lg">Loading...</p>
        </div>
    );
}
