import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, getContacts } from "../../services/api";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        contacts: 0,
        blogs: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [contactsData, blogsData] = await Promise.all([
                    getContacts(),
                    getBlogs()
                ]);

                setStats({
                    contacts: contactsData.success ? contactsData.data.length : 0,
                    blogs: blogsData.success && Array.isArray(blogsData.data) ? blogsData.data.length : 0
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, count, link, label }) => (
        <div className="bg-[#1a1a1a] text-[#f8f0dd] p-6 md:p-8 rounded-3xl border border-[#f8f0dd]/10 hover:border-primary/50 transition-all duration-300 group">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-2">{title}</h3>
            <p className="text-5xl md:text-6xl font-[arkhip] text-primary mb-4 md:mb-6 group-hover:scale-105 transition-transform origin-left">{loading ? '-' : count}</p>
            <Link to={link} className="inline-flex items-center text-xs font-bold uppercase tracking-widest border-b border-primary/30 pb-1 hover:text-primary hover:border-primary transition-colors">
                {label} &rarr;
            </Link>
        </div>
    );

    return (
        <div>
            <header className="mb-6 md:mb-12">
                <p className="text-xs font-[arkhip] uppercase tracking-[0.35em] text-[#0a0a0a]/40">Overview</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-[arkhip] text-[#0a0a0a] mt-2">Dashboard</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCard
                    title="Total Blogs"
                    count={stats.blogs}
                    link="/admin/blogs/manage"
                    label="Manage Blogs"
                />
                <StatCard
                    title="Total Inquiries"
                    count={stats.contacts}
                    link="/admin/contacts"
                    label="View Inquiries"
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
