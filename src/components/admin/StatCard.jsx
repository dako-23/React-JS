export default function StatCard({ title, value }) {
    return (
        <div className="bg-gradient-to-r from-lime-300 to-amber-100 rounded-xl shadow p-6 text-center border border-gray-200">
            <p className="text-gray-800 text-semibold mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );
}