import { useActionState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import { MdTitle } from "react-icons/md";

export default function ContactForm({ onSuccess, onError }) {

    const handleSubmitContact = async (prevState, formData) => {
        const values = Object.fromEntries(formData);

        try {
            await emailjs.send(
                "service_finuo7b",
                "template_9s5cp6p",
                {
                    title: values.title,
                    name: values.name,
                    email: values.email,
                    message: values.message,
                },
                "zhdhBPBbfAsc09QO1"
            );
            values.title = '',
                values.name = '',
                values.email = '',
                values.message = ''

            onSuccess("Email sent successfully!");
        } catch (err) {
            onError("Error sending email.");
        }

        return values;
    };

    const [values, contactAction, isPending] = useActionState(handleSubmitContact, {
        title: "",
        name: "",
        email: "",
        message: "",
    });

    return (
        <form
            action={contactAction}
            className="bg-white p-6 shadow-lg rounded-xl border border-gray-200"
        >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaEnvelope className="text-gray-800" /> Get in Touch
            </h3>

            <div className="space-y-4">
                <div className="flex items-center border p-3 rounded-lg bg-gray-100">
                    <MdTitle size={22} className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="w-full bg-transparent outline-none"
                        defaultValue={values.title}
                    />
                </div>

                <div className="flex items-center border p-3 rounded-lg bg-gray-100">
                    <FaUser className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full bg-transparent outline-none"
                        defaultValue={values.name}
                    />
                </div>

                <div className="flex items-center border p-3 rounded-lg bg-gray-100">
                    <FaEnvelope className="text-gray-500 mr-2" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full bg-transparent outline-none"
                        defaultValue={values.email}
                    />
                </div>

                <div className="flex items-start border p-3 rounded-lg bg-gray-100">
                    <FaCommentDots className="text-gray-500 mr-2 mt-1" />
                    <textarea
                        name="message"
                        placeholder="Your Message..."
                        className="w-full bg-transparent outline-none resize-none h-24"
                        defaultValue={values.message}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
                    disabled={isPending}
                >
                    Send Message
                </button>
            </div>
        </form>
    );
}
