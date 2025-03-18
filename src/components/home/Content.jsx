import React from "react";
import Typewriter from "react-typewriter-effect";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";

const textVariants = {
    hidden: { y: -150, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 10,
            bounce: 0.1,
            delay: 0.3,
        },
    },
};

export default function Content() {
    const navigate = useNavigate();

    return (
        <div className="bg-home-pattern h-screen bg-cover bg-center flex items-center justify-center text-white text-2xl font-bold">
            <div className="flex flex-col text-center justify-center w-full h-full mt-[-600px] mx-auto max-w-[1100px]">
                <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-bold md:text-5xl sm:text-5xl text-3xl md:py-6"
                >
                    The place where moms become friends!
                </motion.h1>

                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center items-center"
                >
                    <p className="md:text-4xl sm:text-3xl text-xl font-bold">
                        Momma’s Gang – a place to
                    </p>
                    <div className="md:text-4xl sm:text-3xl text-xl font-bold pl-2">
                        <Typewriter
                            startDelay={500}
                            cursorColor="white"
                            multiText={[
                                "connect",
                                "share",
                                "support"
                            ]}
                            multiTextDelay={1500}
                            typeSpeed={150}
                            multiTextLoop={true}
                        />
                    </div>
                </motion.div>
                <motion.button onClick={() => navigate('/users/login')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="active:opacity-[0.7] absolute bottom-24 left-1/2 transform -translate-x-1/2 font-bold bg-gray-800 shadow-xl shadow-lime-700/100 mx-auto my-12 w-[170px] h-[45px] rounded-lg overflow-hidden transition-all flex items-center justify-center before:ease before:absolute before:right-0 before:top-0 before:h-full before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-lime-500 hover:before:-translate-x-40"
                >
                    Sign Up
                </motion.button>
            </div>
        </div>
    );
}
