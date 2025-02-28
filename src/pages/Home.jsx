import { motion } from 'framer-motion';
import PartnersCarousel from "../components/PartnersCarousel.jsx";
import Content from "../components/Content";
import GroupsIntro from "../components/GroupsIntro.jsx";
import Topics from "../components/Topics.jsx";
import Description from "../components/Description.jsx";
import Recommendations from "../components/Recommendations.jsx";

const childVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: "easeOut" }
    }
};

export default function Home() {
    return (
        <>
            <Content />
            <div className="container mx-auto px-4">
                <motion.div
                    variants={childVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <PartnersCarousel />
                </motion.div>
                <motion.div
                    variants={childVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <GroupsIntro />
                </motion.div>
                <motion.div
                    variants={childVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Description />
                </motion.div>
                <motion.div
                    variants={childVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Topics />
                </motion.div>
                <motion.div
                    variants={childVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Recommendations />
                </motion.div>
            </div>
        </>
    );
}
