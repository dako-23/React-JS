import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaBaby } from "react-icons/fa";

const sections = [
  { id: 1, path: '/groups', title: "💬 Групи", icon: <FaUsers size={30} />, desc: "Намерете майки със сходни интереси!" },
  { id: 2, path: '/', title: "📅 Събития", icon: <FaCalendarAlt size={30} />, desc: "Присъединете се към локални срещи." },
  { id: 3, path: '/', title: "🍼 Споделяне", icon: <FaBaby size={30} />, desc: "Публикувайте моменти с вашите деца." },
];

export default function GroupsIntro() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
      {sections.map((section) => (
        <motion.div
          onClick={() => navigate(section.path)}
          key={section.id}
          layout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h3 className="text-lg font-semibold mt-4">{section.title}</h3>
          <p className="text-gray-500">{section.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
