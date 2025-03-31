import { useEffect, useState } from "react";
import { useAdminApi } from "../../api/adminApi.js";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import Loader from "../Loader.jsx";
import { useToast } from "../../hooks/useToast.js";
import StatCard from "./StatCard.jsx";
import UserTable from "./user-table/UserTable.jsx";

export default function AdminDashboard() {

    const [stats, setStats] = useState(null);
    const { getStats } = useAdminApi();
    const { error } = useToast();

    useEffect(() => {
        getStats()
            .then(data => setStats(data))
            .catch(err => error(err.message));
    }, []);

    if (!stats) return (
        <div className="p-24">
            <Loader />
        </div>
    );

    const chartData = [
        { name: 'Users', value: stats.users.total },
        { name: 'Admins', value: stats.users.admins },
        { name: 'Posts', value: stats.posts.total },
        { name: 'Groups', value: stats.groups.total },
        { name: 'Locked Groups', value: stats.groups.locked },
        { name: 'Favorites', value: stats.favorites },
        { name: 'Reviews', value: stats.reviews.total }
    ];

    return (
        <div className="max-w-6xl mx-auto p-8 bg-page-pattern min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-2 py-14">Admin Dashboard</h2>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Total Users" value={stats.users.total} />
                    <StatCard title="Admins" value={stats.users.admins} />
                    <StatCard title="Total Posts" value={stats.posts.total} />
                    <StatCard title="Groups" value={stats.groups.total} />
                    <StatCard title="Locked Groups" value={stats.groups.locked} />
                    <StatCard title="Favorites" value={stats.favorites} />
                    <StatCard title="Avg. Rating" value={stats.reviews.avgRating.toFixed(1)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-gradient-to-r from-lime-100 to-green-200 p-6 rounded-xl shadow border">
                        <h3 className="text-xl font-bold mb-4 text-center">System Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#1F2937" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-r from-lime-100 to-green-200 p-6 rounded-xl shadow border">
                        <h3 className="text-xl font-bold mb-4 text-center">Growth Simulation</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#ccc" />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#1F2937" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
            <UserTable />
        </div>
    );
}

