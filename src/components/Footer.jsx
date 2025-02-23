import { useState } from "react";

export default function Footer() {

    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqs = [
        { question: "What is Momma’s Gang?", answer: "Momma’s Gang is a community for moms to connect, share experiences, and support each other." },
        { question: "Is it free to join?", answer: "Yes! Momma’s Gang is completely free for all moms to join and participate in." },
        { question: "How can I create a ‘gang’?", answer: "Simply go to the ‘Create a Gang’ section, choose a name, and invite other moms to join." },
    ];

    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6">

                {/* FAQ Section */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    className="w-full text-left bg-gray-800 px-4 py-3 rounded-lg text-gray-300 hover:text-white focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.question}
                                </button>
                                {openFAQ === index && (
                                    <p className="bg-gray-700 text-gray-300 p-3 rounded-lg mt-2">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Links & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">

                    {/* Logo & About */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-lg font-bold">Momma’s Gang</h2>
                        <p className="text-sm text-gray-400">A place where moms connect, share, and support each other.</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-6 text-gray-400">
                        <a href="/" className="hover:text-white">Home</a>
                        <a href="/about" className="hover:text-white">About</a>
                        <a href="/community" className="hover:text-white">Community</a>
                        <a href="/contact" className="hover:text-white">Contact</a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                            <img src="/telegram.png" alt="Telegram" className="h-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="/fb.webp" alt="Facebook" className="h-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="/instagram.png" alt="Instagram" className="h-6" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-gray-500 text-sm mt-6">
                    © {new Date().getFullYear()} Momma’s Gang. All rights reserved.
                </div>
            </div>
        </footer>
    );
}