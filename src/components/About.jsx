import { useState } from "react";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import MapComponent from "./mapComponent.jsx";

export default function About() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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

                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaEnvelope className="text-gray-800" /> Get in Touch
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center border p-3 rounded-lg bg-gray-100">
                            <FaUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="w-full bg-transparent outline-none"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-center border p-3 rounded-lg bg-gray-100">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="w-full bg-transparent outline-none"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-start border p-3 rounded-lg bg-gray-100">
                            <FaCommentDots className="text-gray-500 mr-2 mt-1" />
                            <textarea
                                name="message"
                                placeholder="Your Message..."
                                className="w-full bg-transparent outline-none resize-none h-24"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-lime-700 transition"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
                <div className="relative w-full h-[300px] rounded-xl shadow-lg overflow-hidden">
                    <MapComponent />
                </div>
            </div>
        </div>
    );
}
