import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBlog, getBlogs } from "../../services/api";

const AdminManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        setLoading(true);
        try {
            const response = await getBlogs();
            setBlogs(response.success && Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await deleteBlog(id);
            if (res.success) {
                loadBlogs();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <header className="mb-6 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/40">Overview</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-[arkhip] text-black mt-2">Manage Blogs</h2>
                </div>
                <Link
                    to="/admin/blogs/create"
                    className="w-full sm:w-auto bg-black text-white px-6 md:px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-lg text-center"
                >
                    + Create New
                </Link>
            </header>

            <section className="bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-black/40 uppercase tracking-widest text-sm">Loading...</div>
                ) : blogs.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <p className="text-black/40 uppercase tracking-widest text-sm">No blogs found.</p>
                        <Link to="/admin/blogs/create" className="text-primary font-bold underline">Create one now</Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1a1a1a] text-white">
                                <tr>
                                    <th className="p-3 md:p-6 text-xs font-bold uppercase tracking-widest opacity-60">Title</th>
                                    <th className="p-3 md:p-6 text-xs font-bold uppercase tracking-widest opacity-60 hidden md:table-cell">Author</th>
                                    <th className="p-3 md:p-6 text-xs font-bold uppercase tracking-widest opacity-60 hidden lg:table-cell">Date</th>
                                    <th className="p-3 md:p-6 text-xs font-bold uppercase tracking-widest opacity-60 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {blogs.map(blog => (
                                    <tr key={blog.id} className="hover:bg-[#f8f0dd]/20 transition-colors group">
                                        <td className="p-3 md:p-6">
                                            <h4 className="font-bold text-base md:text-lg text-black">{blog.title}</h4>
                                            <p className="text-xs text-black/50 mt-1 line-clamp-1 max-w-md">{blog.excerpt}</p>
                                        </td>
                                        <td className="p-3 md:p-6 text-sm font-bold text-black/70 hidden md:table-cell">{blog.author}</td>
                                        <td className="p-3 md:p-6 text-sm text-black/60 hidden lg:table-cell">
                                            {new Date(blog.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 md:p-6">
                                            <div className="flex flex-col sm:flex-row gap-2 justify-end">
                                                <Link
                                                    to={`/admin/blogs/edit/${blog.id}`}
                                                    className="text-white bg-blue-500 hover:bg-blue-600 px-3 md:px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md text-center"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteBlog(blog.id)}
                                                    className="text-white bg-red-500 hover:bg-red-600 px-3 md:px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminManageBlogs;
