import MapComponent from "./MapComponent.jsx";
import { useState } from "react";
import SuccessToast from "../notifications/SuccessToast.jsx";
import ErrorToast from "../notifications/ErrorToast.jsx";
import ContactForm from "./ContactForm.jsx";

export default function About() {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showNotify, setShowNotify] = useState(false)
    const [showNotifyErr, setShowNotifyErr] = useState(false)

    const handleSuccess = (msg) => {
        setSuccess(msg);
        setShowNotify(true);
    };

    const handleError = (msg) => {
        setError(msg);
        setShowNotifyErr(true);
    };

    return (

        <div className="max-w-6xl mx-auto py-16 px-6">

            <h2 className="text-3xl font-extrabold text-gray-700 text-center mb-4">
                About <span className="text-lime-600">Momma's Gang</span>
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-10">
                We’re here to create a warm and supportive community for moms around the world.
                Got a question, suggestion, or just want to share your experience?
                Feel free to reach out to us!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {showNotify &&
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-full max-w-sm flex justify-center">
                        <SuccessToast message={success} show={setShowNotify} />
                    </div>}

                {showNotifyErr &&
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-full max-w-sm flex justify-center">
                        <ErrorToast message={error} show={setShowNotifyErr} />
                    </div>}

                <ContactForm onSuccess={handleSuccess} onError={handleError} />
                <div className="relative w-full h-[300px] rounded-xl shadow-lg overflow-hidden">
                    <MapComponent />
                </div>
            </div>
        </div>
    );
}
