import { motion } from "framer-motion";

export default function TermsAndConditions() {
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-6 py-16 bg-page-pattern text-gray-800"
        >
            <h1 className="text-3xl font-bold mb-6 text-center">📜 Terms & Conditions</h1>

            <section className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-2">1. Who We Are</h2>
                    <p>
                        Momma’s Gang is a social networking platform built exclusively for mothers.
                        We provide a supportive and secure space for moms to connect, share, and engage through groups,
                        posts, events, and other interactive features.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">2. Eligibility</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>You must be at least 18 years old.</li>
                        <li>Be a mother or identify as a caregiver looking to join a supportive motherhood community.</li>
                        <li>Provide accurate and truthful information.</li>
                    </ul>
                    <p>
                        We reserve the right to suspend or remove accounts that violate our community values or pose risks to other users.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">3. Community Conduct</h2>
                    <p>By using the Platform, you agree NOT to:</p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Harass, threaten, or abuse other users.</li>
                        <li>Post offensive, hateful, illegal, or sexually explicit content.</li>
                        <li>Impersonate others or misrepresent your identity.</li>
                        <li>Share false information or spam the community.</li>
                        <li>Violate the privacy of other users by sharing their content without consent.</li>
                    </ul>
                    <p>
                        We encourage kindness, empathy, and authenticity. Repeat violations may result in account suspension or permanent removal.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">4. Content Ownership</h2>
                    <p>
                        You retain ownership of the content you post (e.g., messages, images, comments), but by uploading it to Momma’s Gang,
                        you grant us a non-exclusive license to display and distribute it on the platform as needed to support functionality.
                        We do not sell your content or data to third parties.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">5. Privacy</h2>
                    <p>
                        Your privacy is important. Please review our <span className="underline text-lime-700 cursor-pointer">Privacy Policy</span> for more
                        information.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">6. Termination</h2>
                    <p>
                        You may delete your account at any time. We reserve the right to suspend
                        or remove accounts that breach these terms.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">7. Limitation of Liability</h2>
                    <p>
                        We are not responsible for user content or offline interactions. Use the
                        platform at your own discretion.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">8. Updates</h2>
                    <p>
                        These terms may change from time to time. Continued use of the platform
                        means you accept any updates.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">9. Contact</h2>
                    <p>
                        For questions, contact us at: <span className="text-lime-700 font-medium">support@mommasgang.com</span>
                    </p>
                </div>
            </section>

            <p className="text-center mt-12 font-semibold text-gray-700">
                Thank you for being part of Momma’s Gang 💖
            </p>
        </motion.div>
    );
}
