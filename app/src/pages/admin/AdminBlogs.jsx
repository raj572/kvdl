import { useState } from "react";
import TiptapEditor from "../../components/admin/TiptapEditor";
import { useCreateBlogMutation, useDeleteBlogMutation, useGetBlogsQuery } from "../../services/blogsApi";

const AdminBlogs = () => {
    const { data: blogsData, isLoading: loading } = useGetBlogsQuery();
    const blogs = Array.isArray(blogsData?.data) ? blogsData.data : [];

    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();

    // Blog Form State
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [videoType, setVideoType] = useState('youtube');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');

    const [notification, setNotification] = useState(null);

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await deleteBlog(id).unwrap();
            if (res.success) {
                showNotification("Blog deleted successfully");
            } else {
                showNotification("Failed to delete blog", true);
            }
        } catch (err) {
            console.error(err);
            showNotification("Error deleting blog", true);
        }
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();

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

            const response = await createBlog(formData).unwrap();

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
            } else {
                showNotification("Failed to create blog.", true);
            }
        } catch (error) {
            console.error(error);
            showNotification("Error creating blog.", true);
        }
    };

    const showNotification = (msg, isError = false) => {
        setNotification({ msg, isError });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div>
            <header className="mb-8">
                <p className="text-xs font-[arkhip] uppercase tracking-[0.35em] text-[#0a0a0a]/40">Management</p>
                <h2 className="text-4xl md:text-5xl font-[arkhip] text-[#0a0a0a] mt-2">Blog Posts</h2>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">

                {/* Form Section */}
                <section className="bg-white rounded-3xl p-8 border border-[#0a0a0a]/10 shadow-xl">
                    <h3 className="text-xl font-[arkhip] text-[#0a0a0a] mb-6 border-b border-[#0a0a0a]/5 pb-4">New Story</h3>

                    <form onSubmit={handleCreateBlog} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full bg-[#f8f0dd]/30 border border-[#0a0a0a]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-bold"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Author</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    className="w-full bg-[#f8f0dd]/30 border border-[#0a0a0a]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                                    placeholder="Admin Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setCoverImage(e.target.files[0])}
                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1a1a1a] file:text-white hover:file:bg-primary"
                            />
                        </div>

                        <div className="p-4 bg-[#f8f0dd]/50 rounded-xl border border-[#0a0a0a]/5">
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Video Media</label>
                            <div className="flex gap-4 mb-4">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer">
                                    <input type="radio" name="videoType" checked={videoType === 'youtube'} onChange={() => setVideoType('youtube')} className="accent-primary" />
                                    YouTube
                                </label>
                                <label className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer">
                                    <input type="radio" name="videoType" checked={videoType === 'upload'} onChange={() => setVideoType('upload')} className="accent-primary" />
                                    Upload File
                                </label>
                            </div>
                            {videoType === 'youtube' ? (
                                <input
                                    type="url"
                                    value={videoUrl}
                                    onChange={e => setVideoUrl(e.target.value)}
                                    className="w-full bg-white border border-[#0a0a0a]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                                    placeholder="YouTube URL..."
                                />
                            ) : (
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={e => setVideoFile(e.target.files[0])}
                                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1a1a1a] file:text-white hover:file:bg-primary"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Excerpt</label>
                            <textarea
                                rows="2"
                                value={excerpt}
                                onChange={e => setExcerpt(e.target.value)}
                                className="w-full bg-[#f8f0dd]/30 border border-[#0a0a0a]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Content</label>
                            <TiptapEditor value={content} onChange={setContent} />
                        </div>

                        <div className="border-t border-[#0a0a0a]/10 pt-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">SEO Settings</h4>
                            <div className="space-y-3">
                                <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Meta Title" className="w-full bg-white border border-[#0a0a0a]/10 rounded-lg px-4 py-2 text-xs" />
                                <input type="text" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} placeholder="Meta Description" className="w-full bg-white border border-[#0a0a0a]/10 rounded-lg px-4 py-2 text-xs" />
                                <input type="text" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} placeholder="Keywords" className="w-full bg-white border border-[#0a0a0a]/10 rounded-lg px-4 py-2 text-xs" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isCreating}
                            className="w-full bg-[#1a1a1a] text-white hover:bg-primary hover:text-[#0a0a0a] font-bold uppercase tracking-widest py-4 rounded-xl transition-all disabled:opacity-50"
                        >
                            {isCreating ? 'Publishing...' : 'Publish Blog Post'}
                        </button>

                        {notification && (
                            <p className={`text-center text-xs font-bold uppercase tracking-widest ${notification.isError ? 'text-red-500' : 'text-green-600'}`}>{notification.msg}</p>
                        )}
                    </form>
                </section>

                {/* List Section */}
                <section className="bg-white rounded-3xl p-8 border border-[#0a0a0a]/10 shadow-xl h-fit">
                    <h3 className="text-xl font-[arkhip] text-[#0a0a0a] mb-6 border-b border-[#0a0a0a]/5 pb-4">Published</h3>
                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                        {blogs.length === 0 ? (
                            <p className="opacity-40 text-sm italic">No blogs yet.</p>
                        ) : (
                            blogs.map(blog => (
                                <div key={blog.id} className="p-4 rounded-xl border border-[#0a0a0a]/5 hover:border-primary/50 bg-[#f8f0dd]/20 transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-sm leading-tight text-[#0a0a0a] group-hover:text-primary transition-colors">{blog.title}</h4>
                                        <button onClick={() => handleDeleteBlog(blog.id)} className="text-[10px] text-red-500 uppercase font-bold tracking-wider hover:underline">Delete</button>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-wide opacity-40 mb-2">{new Date(blog.created_at).toLocaleDateString()}</p>
                                    <p className="text-xs opacity-60 line-clamp-2">{blog.excerpt}</p>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminBlogs;
