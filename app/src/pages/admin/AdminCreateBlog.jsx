import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Eye,
    Globe,
    Hash,
    Image as ImageIcon,
    Save,
    Settings,
    User,
    X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "../../components/admin/TiptapEditor";
import { createBlog, getBlogById, updateBlog } from "../../services/api";

// Helper for SEO Score (Simple heuristic)
const calculateSeoScore = (title, desc, content, keywords) => {
    let score = 0;
    if (title.length > 10 && title.length < 70) score += 20;
    if (desc.length > 50 && desc.length < 160) score += 20;
    if (content.length > 300) score += 20;
    if (keywords.length > 0) score += 10;
    if (content.includes(keywords.split(',')[0])) score += 10; // Keyword in content
    if (title.includes(keywords.split(',')[0])) score += 20;   // Keyword in title
    return Math.min(score, 100);
};

const AdminCreateBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    // --- State ---
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Drawer state

    // Form Data
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // HTML Content
    const [excerpt, setExcerpt] = useState('');
    const [author, setAuthor] = useState('Admin'); // Default author
    const [status, setStatus] = useState('draft');
    const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 16));

    // Media
    const [coverImage, setCoverImage] = useState(null);
    const [existingCoverUrl, setExistingCoverUrl] = useState('');
    const [videoType, setVideoType] = useState('youtube');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    // SEO & Metadata
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');

    // UI
    const [seoOpen, setSeoOpen] = useState(true);
    const [notification, setNotification] = useState(null);

    const drawerRef = useRef(null);

    const scrollDrawer = (amount) => {
        if (drawerRef.current) {
            drawerRef.current.scrollBy({ top: amount, behavior: 'smooth' });
        }
    };

    // --- Effects ---
    // Body Scroll Lock when Drawer is open
    useEffect(() => {
        if (isSettingsOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Double lock
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isSettingsOpen]);

    useEffect(() => {
        if (isEditMode) {
            fetchBlogDetails();
        } else {
            // Check for saved draft in localStorage? (Optional enhancement)
            const savedDraft = localStorage.getItem('blog_draft');
            if (savedDraft) {
                // Restore draft logic could go here
            }
        }
    }, [id]);

    // Auto-save effect (Debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!loading && title) {
                // Save to local storage for crash recovery
                const draft = { title, content, excerpt, author, status, metaTitle, metaDescription };
                localStorage.setItem('blog_draft', JSON.stringify(draft));
                setLastSaved(new Date());
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [title, content, excerpt, author, status, metaTitle, metaDescription, loading]);

    // --- Actions ---
    const fetchBlogDetails = async () => {
        setLoading(true);
        try {
            const response = await getBlogById(id);
            if (response.success && response.data) {
                const blog = response.data;
                setTitle(blog.title);
                setContent(blog.content || ''); // Ensure compatibility
                setExcerpt(blog.excerpt || '');
                setAuthor(blog.author || 'Admin');
                setStatus(blog.status || 'draft');
                setExistingCoverUrl(blog.cover_url || '');
                setVideoType(blog.video_type || 'youtube');
                setVideoUrl(blog.video_url || '');
                setMetaTitle(blog.meta_title || '');
                setMetaDescription(blog.meta_description || '');
                setMetaKeywords(blog.meta_keywords || '');
                // setPublishDate(...) // If backend supported it
            }
        } catch (error) {
            showNotification("Error loading blog details", true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e, type = 'publish') => {
        if (e) e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content); // Send HTML directly
            formData.append('excerpt', excerpt);
            formData.append('author', author);
            formData.append('status', type === 'draft' ? 'draft' : status);

            if (coverImage) formData.append('cover_image', coverImage);
            else if (existingCoverUrl) formData.append('coverUrl', existingCoverUrl);

            formData.append('video_type', videoType);
            if (['youtube', 'instagram'].includes(videoType)) formData.append('video_url', videoUrl);
            else if (videoFile) formData.append('video_file', videoFile);

            formData.append('meta_title', metaTitle);
            formData.append('meta_description', metaDescription);
            formData.append('meta_keywords', metaKeywords);

            let response;
            if (isEditMode) {
                response = await updateBlog(id, formData);
            } else {
                response = await createBlog(formData);
            }

            if (response.success) {
                showNotification(`Blog ${isEditMode ? 'updated' : 'created'} successfully!`);
                localStorage.removeItem('blog_draft');
                if (!isEditMode) {
                    // navigate('/admin/blogs/manage'); // Optional: Stay on page for "Zen" feel? Or navigate back.
                    navigate('/admin/blogs/manage');
                }
            } else {
                throw new Error(response.message || 'Operation failed');
            }
        } catch (error) {
            showNotification(error.message || "Something went wrong", true);
        } finally {
            setSubmitting(false);
        }
    };

    const handlePreview = () => {
        const previewData = {
            title,
            author,
            content, // HTML
            created_at: new Date().toISOString(),
            cover_url: coverImage ? URL.createObjectURL(coverImage) : existingCoverUrl
        };
        localStorage.setItem('admin_blog_preview', JSON.stringify(previewData));
        window.open('/admin/blogs/preview', '_blank');
    };

    const showNotification = (msg, isError = false) => {
        setNotification({ msg, isError });
        setTimeout(() => setNotification(null), 3000);
    };

    const seoScore = calculateSeoScore(metaTitle || title, metaDescription || excerpt, content, metaKeywords);
    const readingTime = Math.ceil(wordCount / 200);

    if (loading) return <div className="h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

    return (
        <div className="min-h-screen bg-background text-foreground font-[sansation] relative pb-20">

            {/* --- Top Navigation Bar --- */}
            <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-foreground/5 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/blogs/manage')} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                        <ArrowLeft size={20} className="opacity-60" />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                            {isEditMode ? 'Editing Post' : 'New Post'}
                        </span>
                        <span className="text-xs font-bold opacity-60 flex items-center gap-2">
                            {lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Unsaved'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="hidden md:inline text-xs font-bold text-foreground/40 mr-4">
                        {wordCount} words • {readingTime} min read
                    </span>

                    <button onClick={handlePreview} className="hidden md:flex btn-secondary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider items-center gap-2 hover:bg-foreground/5">
                        <Eye size={16} /> Preview
                    </button>

                    <button onClick={() => handleSubmit(null, 'draft')} className="hidden md:flex btn-secondary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider items-center gap-2 border border-foreground/10 hover:bg-foreground/5">
                        <Save size={16} /> Draft
                    </button>

                    <button onClick={handleSubmit} className="hidden md:flex bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg transition-all items-center gap-2">
                        {submitting ? 'Publishing...' : 'Publish'}
                    </button>

                    <div className="w-px h-8 bg-foreground/10 mx-2 hidden md:block"></div>

                    {/* Settings Toggle */}
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className={`p-2 rounded-lg hover:bg-foreground/5 transition-colors relative ${isSettingsOpen ? 'text-primary bg-foreground/5' : 'text-foreground/60'}`}
                        title="Post Settings"
                    >
                        <Settings size={20} />
                        {/* Dot indicator if important fields are missing? Optional */}
                    </button>
                </div>
            </header>

            {/* --- Main Editor Area (Centered, Zen Mode) --- */}
            <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-4xl md:text-5xl lg:text-6xl font-bold bg-transparent border-none outline-none placeholder:text-foreground/10 mb-8 font-[arkhip] leading-tight"
                />

                {/* Editor */}
                <TiptapEditor
                    content={content}
                    onChange={setContent}
                    onCharacterCountChange={setWordCount}
                />
            </main>

            {/* --- Settings Drawer --- */}

            {/* Backdrop */}
            {isSettingsOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
                    onClick={() => setIsSettingsOpen(false)}
                />
            )}

            {/* Slide-over Panel */}
            <aside
                className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'} h-[100dvh] flex flex-col`}
            >
                {/* Scrollable Content */}
                <div
                    ref={drawerRef}
                    className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-white pb-32 overscroll-contain"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-[arkhip]">Post Settings</h2>
                        <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Groups */}

                    {/* 1. Publishing */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                            <Calendar size={12} /> Publishing
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-foreground/5 rounded-xl p-3">
                                <label className="text-[10px] font-bold uppercase opacity-60 mb-1 block">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full bg-transparent text-sm font-bold outline-none cursor-pointer text-primary"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="bg-foreground/5 rounded-xl p-3">
                                <label className="text-[10px] font-bold uppercase opacity-60 mb-1 block">Date</label>
                                <input
                                    type="datetime-local"
                                    value={publishDate}
                                    onChange={(e) => setPublishDate(e.target.value)}
                                    className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </section>

                    <hr className="border-foreground/5" />

                    {/* 2. Featured Media */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                            <ImageIcon size={12} /> Featured Image
                        </h3>
                        <div className="relative group rounded-xl overflow-hidden bg-foreground/5 border border-foreground/10 aspect-video hover:border-primary/50 transition-colors">
                            {(coverImage || existingCoverUrl) ? (
                                <img
                                    src={coverImage ? URL.createObjectURL(coverImage) : (existingCoverUrl.startsWith('http') ? existingCoverUrl : `${import.meta.env.VITE_API_BASE_URL}${existingCoverUrl}`)}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                                    <ImageIcon size={32} className="mb-2" />
                                    <span className="text-xs uppercase font-bold text-center px-4">Click to upload cover image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) setCoverImage(e.target.files[0]);
                                }}
                            />
                            {(coverImage || existingCoverUrl) && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setCoverImage(null); setExistingCoverUrl('') }}
                                    className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow-sm hover:bg-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </section>

                    <hr className="border-foreground/5" />

                    {/* 3. SEO */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                                <Globe size={12} /> SEO & Metadata
                            </h3>
                            {/* Score Tag */}
                            <div className={`px-2 py-1 rounded text-[10px] font-bold ${seoScore > 80 ? 'bg-green-100 text-green-700' : seoScore > 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                Score: {seoScore}/100
                            </div>
                        </div>

                        {/* Google Preview */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-left">
                            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
                                <Globe size={10} /> kvdl.lazfort.com › blog › ...
                            </div>
                            <div className="text-sm text-[#1a0dab] font-sans font-medium hover:underline truncate">
                                {metaTitle || title || 'Post Title'}
                            </div>
                            <div className="text-xs text-[#4d5156] font-sans line-clamp-2 mt-1">
                                {metaDescription || excerpt || "Post description goes here..."}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-bold uppercase opacity-60 mb-1 block">Meta Title</label>
                                <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full bg-foreground/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all" maxLength={60} placeholder="SEO Title" />
                                <div className="text-[8px] text-right mt-1 opacity-40">{metaTitle.length}/60</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase opacity-60 mb-1 block">Meta Description</label>
                                <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows="3" className="w-full bg-foreground/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none" maxLength={160} placeholder="Brief summary for search engines..."></textarea>
                                <div className="text-[8px] text-right mt-1 opacity-40">{metaDescription.length}/160</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase opacity-60 mb-1 block">Keywords</label>
                                <div className="flex items-center gap-2 bg-foreground/5 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-primary transition-all">
                                    <Hash size={12} className="opacity-40" />
                                    <input type="text" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} className="bg-transparent w-full text-xs focus:outline-none" placeholder="real estate, modern, design..." />
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-foreground/5" />

                    {/* 4. Organization */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                            <User size={12} /> Organization
                        </h3>
                        <div className="flex items-center gap-2 bg-foreground/5 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-primary transition-all">
                            <User size={14} className="opacity-40" />
                            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="bg-transparent w-full text-xs focus:outline-none" placeholder="Author Name" />
                        </div>
                    </section>

                    {/* Mobile Only Actions in Drawer Bottom */}
                    <div className="md:hidden pt-8 pb-20 space-y-3">
                        <button onClick={handleSubmit} className="w-full bg-primary text-white py-3 rounded-xl font-bold uppercase tracking-wider text-sm shadow-xl">
                            Publish Now
                        </button>
                        <button onClick={() => handleSubmit(null, 'draft')} className="w-full border border-foreground/10 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-foreground/5">
                            Save Draft
                        </button>
                    </div>

                </div>

                {/* Floating Scroll Buttons */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-50">
                    <button
                        onClick={() => scrollDrawer(-300)}
                        className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all active:scale-95 border-2 border-white"
                        title="Scroll Up"
                    >
                        <ChevronUp size={24} />
                    </button>
                    <button
                        onClick={() => scrollDrawer(300)}
                        className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all active:scale-95 border-2 border-white"
                        title="Scroll Down"
                    >
                        <ChevronDown size={24} />
                    </button>
                </div>
            </aside>

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-[60] animate-in slide-in-from-bottom-5 ${notification.isError ? 'bg-red-500 text-white' : 'bg-black text-white'}`}>
                    {notification.isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    <div>
                        <p className="text-sm font-bold">{notification.msg}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCreateBlog;
