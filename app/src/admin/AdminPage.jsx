import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../components/admin/TiptapEditor";
import { adminLogout, createBlog, deleteBlog, getBlogs, getContacts } from "../services/api";

const AdminPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("contacts");
    const [contacts, setContacts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Blog Form State
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [videoType, setVideoType] = useState('youtube'); // 'youtube' or 'upload'
    const [videoUrl, setVideoUrl] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contactData, blogData] = await Promise.all([
                getContacts(),
                getBlogs()
            ]);

            if (contactData.success) setContacts(contactData.data);
            if (blogData.success) setBlogs(Array.isArray(blogData.data) ? blogData.data : []);

        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await adminLogout();
        navigate("/admin/login");
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await deleteBlog(id);
            if (res.success) {
                showNotification("Blog deleted successfully");
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('excerpt', excerpt);
            formData.append('content', content);

            if (coverImage) formData.append('cover_image', coverImage);

            formData.append('video_type', videoType);
            if (videoType === 'youtube') {
                formData.append('video_url', videoUrl);
            } else if (videoFile) {
                formData.append('video_file', videoFile);
            }

            formData.append('meta_title', metaTitle);
            formData.append('meta_description', metaDescription);
            formData.append('meta_keywords', metaKeywords);

            const response = await createBlog(formData);

            if (response.success) {
                showNotification("Blog post created.");
                // Reset form
                setTitle('');
                setAuthor('');
                setExcerpt('');
                setContent('');
                setCoverImage(null);
                setVideoType('youtube');
                setVideoUrl('');
                setVideoFile(null);
                setMetaTitle('');
                setMetaDescription('');
                setMetaKeywords('');

                // Refresh list
                fetchData();
            } else {
                showNotification("Failed to create blog.", true);
            }
        } catch (error) {
            console.error(error);
            showNotification("Error creating blog.", true);
        } finally {
            setSubmitting(false);
        }
    };

    const showNotification = (msg, isError = false) => {
        setNotification({ msg, isError });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-dvh bg-background text-foreground px-6 py-24">
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <p className="text-xs font-[arkhip] uppercase tracking-[0.35em] text-foreground/60">
                            Admin Panel
                        </p>
                        <h1 className="text-4xl md:text-5xl font-[arkhip] uppercase text-foreground mt-2">
                            Contacts & Blogs
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-foreground/5 rounded-full p-1 border border-foreground/10">
                            <button
                                onClick={() => setActiveTab("contacts")}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "contacts"
                                    ? "bg-primary text-white shadow-lg"
                                    : "text-foreground/60 hover:text-foreground"
                                    }`}
                            >
                                Contacts
                            </button>
                            <button
                                onClick={() => setActiveTab("blogs")}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "blogs"
                                    ? "bg-primary text-white shadow-lg"
                                    : "text-foreground/60 hover:text-foreground"
                                    }`}
                            >
                                Blogs
                            </button>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Content */}
                {activeTab === "contacts" ? (
                    <section className="mt-10 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-[arkhip] mb-6">Inquiries</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : contacts.length === 0 ? (
                            <p>No contacts yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-foreground/10 text-xs uppercase tracking-widest opacity-60">
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Phone</th>
                                            <th className="p-4">Query</th>
                                            <th className="p-4">Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map(c => (
                                            <tr key={c.id} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                                                <td className="p-4 text-sm whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                                                <td className="p-4 font-bold">{c.name}</td>
                                                <td className="p-4 text-sm">{c.email}</td>
                                                <td className="p-4 text-sm">{c.phone}</td>
                                                <td className="p-4 text-sm">{c.query_type}</td>
                                                <td className="p-4 text-sm max-w-xs truncate" title={c.message}>{c.message}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Create Blog Form */}
                        <section className="rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-[arkhip] mb-8">Create Blog Post</h2>

                            <form onSubmit={handleCreateBlog} className="space-y-6">

                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            className="w-full bg-foreground/10 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="Blog Main Title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Author</label>
                                        <input
                                            type="text"
                                            value={author}
                                            onChange={e => setAuthor(e.target.value)}
                                            className="w-full bg-foreground/10 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="Author Name"
                                        />
                                    </div>
                                </div>

                                {/* Cover Image */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Cover Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setCoverImage(e.target.files[0])}
                                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                    />
                                </div>

                                {/* Video Section */}
                                <div className="p-4 bg-foreground/5 rounded-xl border border-foreground/5">
                                    <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Video Content (Optional)</label>
                                    <div className="flex gap-4 mb-4">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="videoType" checked={videoType === 'youtube'} onChange={() => setVideoType('youtube')} />
                                            YouTube Link
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="videoType" checked={videoType === 'upload'} onChange={() => setVideoType('upload')} />
                                            Upload Video
                                        </label>
                                    </div>

                                    {videoType === 'youtube' ? (
                                        <input
                                            type="url"
                                            value={videoUrl}
                                            onChange={e => setVideoUrl(e.target.value)}
                                            className="w-full bg-foreground/10 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                                            placeholder="https://youtube.com/watch?v=..."
                                        />
                                    ) : (
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={e => setVideoFile(e.target.files[0])}
                                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                        />
                                    )}
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Excerpt (Short Summary)</label>
                                    <textarea
                                        rows="3"
                                        value={excerpt}
                                        onChange={e => setExcerpt(e.target.value)}
                                        className="w-full bg-foreground/10 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                                        placeholder="Short summary for the blog listing..."
                                    ></textarea>
                                </div>

                                {/* Rich Editor */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Content *</label>
                                    <TiptapEditor value={content} onChange={setContent} />
                                </div>

                                {/* SEO Section */}
                                <div className="p-4 bg-foreground/5 rounded-xl border border-foreground/5">
                                    <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">SEO / Meta Tags</label>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={metaTitle}
                                            onChange={e => setMetaTitle(e.target.value)}
                                            className="w-full bg-foreground/10 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                                            placeholder="Meta Title (Browser Tab Title)"
                                        />
                                        <input
                                            type="text"
                                            value={metaDescription}
                                            onChange={e => setMetaDescription(e.target.value)}
                                            className="w-full bg-foreground/10 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                                            placeholder="Meta Description (Google Search Snippet)"
                                        />
                                        <input
                                            type="text"
                                            value={metaKeywords}
                                            onChange={e => setMetaKeywords(e.target.value)}
                                            className="w-full bg-foreground/10 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                                            placeholder="Keywords (comma, separated)"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-primary text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                                >
                                    {submitting ? 'Publishing...' : 'Publish Blog'}
                                </button>

                                {notification && (
                                    <p className={`text-center text-sm font-bold uppercase tracking-wider ${notification.isError ? 'text-red-500' : 'text-green-600'}`}>
                                        {notification.msg}
                                    </p>
                                )}
                            </form>
                        </section>

                        {/* Existing Blogs List */}
                        <section className="rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm h-fit">
                            <h2 className="text-2xl font-[arkhip] mb-8">Existing Blogs</h2>
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {blogs.length === 0 ? (
                                    <p className="opacity-60 text-sm">No blogs found.</p>
                                ) : (
                                    blogs.map(blog => (
                                        <div key={blog.id} className="group bg-background/40 p-5 rounded-2xl border border-foreground/10 hover:border-foreground/30 transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-lg leading-tight">{blog.title}</h3>
                                                    <p className="text-xs uppercase tracking-wide opacity-50 mt-1">
                                                        {blog.author} • {new Date(blog.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteBlog(blog.id)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/20 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            <p className="text-sm opacity-70 line-clamp-2">{blog.excerpt}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
