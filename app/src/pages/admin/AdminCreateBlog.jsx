import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import BlockEditor from "../../components/admin/blocks/BlockEditor";
import { createBlog, getBlogById, updateBlog, uploadBlogMedia } from "../../services/api";

const AdminCreateBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    // Blog Form State
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [blocks, setBlocks] = useState([]); // Blocks state instead of string content
    const [coverImage, setCoverImage] = useState(null); // File object for upload
    const [existingCoverUrl, setExistingCoverUrl] = useState(''); // URL for display in edit mode
    const [videoType, setVideoType] = useState('youtube');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    // Custom Modal State
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log('AdminCreateBlog mounted. ID:', id, 'isEditMode:', isEditMode);
        if (isEditMode) {
            fetchBlogDetails();
        }
    }, [id]);

    const fetchBlogDetails = async () => {
        console.log('Fetching blog details for ID:', id);
        setLoading(true);
        try {
            const response = await getBlogById(id);
            if (response.success && response.data) {
                const blog = response.data;
                setTitle(blog.title);
                setAuthor(blog.author || '');
                setExcerpt(blog.excerpt || '');
                setExcerpt(blog.excerpt || '');

                // Parse content: Check if JSON or Legacy HTML
                try {
                    const parsedContent = JSON.parse(blog.content);
                    if (Array.isArray(parsedContent)) {
                        setBlocks(parsedContent);
                    } else {
                        // parsed but not array? treat as text
                        throw new Error("Not an array");
                    }
                } catch (e) {
                    // Fallback for legacy HTML content
                    setBlocks([{
                        id: uuidv4(),
                        type: 'text',
                        content: blog.content || ''
                    }]);
                }

                setExistingCoverUrl(blog.cover_url || '');
                setVideoType(blog.video_type || 'youtube');
                setVideoUrl(blog.video_url || '');
                setMetaTitle(blog.meta_title || '');
                setMetaDescription(blog.meta_description || '');
                setMetaKeywords(blog.meta_keywords || '');
            } else {
                showNotification("Failed to load blog details.", true);
            }
        } catch (error) {
            console.error(error);
            showNotification("Error loading blog.", true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // 1. Process Blocks: Upload any new images
            console.log('=== Starting block processing ===');
            console.log('Total blocks:', blocks.length);

            const processedBlocks = await Promise.all(blocks.map(async (block, index) => {
                console.log(`Block ${index}:`, block.type, block);

                if (block.type === 'image' && block.src && block.isNew && block.file) {
                    console.log(`Uploading image block ${index}:`, {
                        hasFile: !!block.file,
                        fileType: block.file?.type,
                        fileName: block.file?.name,
                        fileSize: block.file?.size,
                        isFileObject: block.file instanceof File
                    });

                    try {
                        const uploadResp = await uploadBlogMedia(block.file);
                        console.log(`Upload response for block ${index}:`, uploadResp);

                        if (uploadResp.success && uploadResp.url) {
                            const updatedBlock = {
                                ...block,
                                src: uploadResp.url,
                                file: null,
                                isNew: false
                            };
                            console.log(`Updated block ${index} after upload:`, updatedBlock);
                            return updatedBlock;
                        }
                    } catch (err) {
                        console.error(`Failed to upload block ${index}:`, err);
                        return block;
                    }
                }
                return block;
            }));

            console.log('=== Finished block processing ===');
            console.log('Processed blocks:', processedBlocks);

            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('excerpt', excerpt);
            formData.append('content', JSON.stringify(processedBlocks));

            if (coverImage) {
                formData.append('cover_image', coverImage);
            } else if (existingCoverUrl && isEditMode) {
                // If checking for existing value in backend, pass it or handle implicitly
                // For this implementation, backend keeps old if no new file sent
                formData.append('coverUrl', existingCoverUrl);
            }

            formData.append('video_type', videoType);
            if (videoType === 'youtube' || videoType === 'instagram') {
                formData.append('video_url', videoUrl);
            } else if (videoFile) {
                formData.append('video_file', videoFile);
            }

            formData.append('meta_title', metaTitle);
            formData.append('meta_description', metaDescription);
            formData.append('meta_keywords', metaKeywords);

            let response;
            if (isEditMode) {
                // formData.append('_method', 'PUT'); // Removed to avoid method spoofing conflict
                response = await updateBlog(id, formData);
            } else {
                response = await createBlog(formData);
            }

            if (response.success) {
                showNotification(`Blog post ${isEditMode ? 'updated' : 'created'} successfully!`);
                setTimeout(() => {
                    navigate('/admin/blogs/manage');
                }, 1500);
            } else {
                let msg = `Failed to ${isEditMode ? 'update' : 'create'} blog.`;
                if (response.message) msg = response.message;
                if (response.errors && Object.keys(response.errors).length > 0) {
                    msg = Object.values(response.errors).flat()[0];
                }
                setErrorMessage(msg);
                setErrorModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            let msg = `Error ${isEditMode ? 'updating' : 'creating'} blog.`;

            if (error.errors && Object.keys(error.errors).length > 0) {
                // Extract the first error message
                msg = Object.values(error.errors).flat()[0];
            } else if (error.message) {
                msg = error.message;
            }

            setErrorMessage(msg);
            setErrorModalOpen(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handlePreview = () => {
        const previewData = {
            title,
            author,
            content: JSON.stringify(blocks), // Stringify blocks to match BlogContentRenderer expectation for "content" prop
            created_at: new Date().toISOString(),
            // No cover image or video for preview if deleted from UI, or use placeholders if needed
        };
        localStorage.setItem('admin_blog_preview', JSON.stringify(previewData));
        window.open('/admin/blogs/preview', '_blank');
    };

    const showNotification = (msg, isError = false) => {
        setNotification({ msg, isError });
        if (isError) {
            setTimeout(() => setNotification(null), 3000);
        }
    };

    if (loading) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className="pb-20 relative">
            {/* Custom Error Modal */}
            {errorModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-red-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-[arkhip] text-red-600 mb-2">Submission Failed</h3>
                        <p className="text-sm text-black/60 mb-8 font-[sansation] leading-relaxed">
                            {errorMessage}
                        </p>
                        <button
                            onClick={() => setErrorModalOpen(false)}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            <header className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/40">
                    {isEditMode ? `Edit Entry #${id}` : 'New Entry'}
                </p>
                <h2 className="text-3xl md:text-4xl font-[arkhip] text-black mt-2">{isEditMode ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">

                    {/* Left Column (Main Content) */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-black/10 shadow-sm">
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-black/10 px-0 py-3 md:py-4 focus:outline-none focus:border-primary transition-colors text-xl md:text-2xl font-bold placeholder:text-black/20"
                                placeholder="Enter blog title here..."
                            />

                            <div className="mt-6">
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Excerpt</label>
                                <textarea
                                    value={excerpt}
                                    onChange={e => setExcerpt(e.target.value)}
                                    rows="3"
                                    className="w-full bg-[#f8f0dd]/30 border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none placeholder:text-black/30"
                                    placeholder="Brief summary of your blog post (optional, but recommended for SEO)..."
                                />
                            </div>

                            <div className="mt-8">
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Content Blocks</label>
                                <p className="text-[10px] text-black/40 mb-3">💡 Text blocks support <strong>bold</strong>, <em>italic</em>, links, and <strong>bullet/numbered lists</strong></p>
                                <BlockEditor blocks={blocks} setBlocks={setBlocks} />
                            </div>
                        </div>



                        <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm">
                            <h4 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-6">SEO Configuration</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Meta Title</label>
                                    <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full bg-[#f8f0dd]/30 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Meta Description</label>
                                    <textarea rows="2" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full bg-[#f8f0dd]/30 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Keywords</label>
                                    <input type="text" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} placeholder="Comma separated" className="w-full bg-[#f8f0dd]/30 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar Settings) */}
                    <div className="space-y-6">
                        {/* Publish Card */}
                        <div className="bg-white rounded-3xl p-6 border border-black/10 shadow-sm">
                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Publishing</h4>
                            <button
                                type="button"
                                onClick={handlePreview}
                                className="w-full bg-white text-black border border-black/10 hover:bg-gray-50 font-bold uppercase tracking-widest py-4 rounded-xl transition-all text-xs shadow-sm mb-4"
                            >
                                Preview Blog Post
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-black text-white hover:bg-primary hover:text-black font-bold uppercase tracking-widest py-4 rounded-xl transition-all disabled:opacity-50 text-xs shadow-lg mb-4"
                            >
                                {submitting ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Post' : 'Publish Post')}
                            </button>
                            {notification && (
                                <div className={`p-3 rounded-lg text-center text-[10px] font-bold uppercase tracking-widest ${notification.isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-800'}`}>
                                    {notification.msg}
                                </div>
                            )}
                            <div className="text-[10px] text-center opacity-40 uppercase tracking-widest">
                                Status: {isEditMode ? 'Published (Editing)' : 'Draft (Unsaved)'}
                            </div>
                        </div>

                        {/* Author Card */}
                        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-black/10 shadow-sm">
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                className="w-full bg-[#f8f0dd]/30 border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                                placeholder="Author Name"
                            />
                        </div>

                        {/* Media Card */}
                        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-black/10 shadow-sm">
                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Media Assets</h4>

                            {/* Cover Image */}
                            <div className="mb-6">
                                <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Cover Image</label>
                                <div className="space-y-3">
                                    {(coverImage || existingCoverUrl) && (
                                        <div className="w-full aspect-video rounded-lg overflow-hidden border border-black/10 bg-gray-50 relative group">
                                            <img
                                                src={coverImage ? URL.createObjectURL(coverImage) : (existingCoverUrl.startsWith('http') ? existingCoverUrl : `${import.meta.env.VITE_API_BASE_URL}${existingCoverUrl}`)}
                                                alt="Cover"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCoverImage(null);
                                                    setExistingCoverUrl('');
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            if (e.target.files?.[0]) {
                                                setCoverImage(e.target.files[0]);
                                            }
                                        }}
                                        className="w-full text-xs text-black/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-black/5 file:text-black hover:file:bg-black/10 transition-all cursor-pointer"
                                    />
                                    <p className="text-[10px] text-black/40">Recommended: 1200x630px JPG/PNG</p>
                                </div>
                            </div>

                            {/* Video Section */}
                            <div className="pt-6 border-t border-black/5">
                                <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Featured Video</label>
                                <div className="grid grid-cols-3 bg-[#f8f0dd]/50 p-1 rounded-xl mb-3 gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setVideoType('youtube')}
                                        className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${videoType === 'youtube' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                                    >
                                        YouTube
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setVideoType('instagram')}
                                        className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${videoType === 'instagram' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                                    >
                                        Instagram
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setVideoType('upload')}
                                        className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${videoType === 'upload' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                                    >
                                        Upload
                                    </button>
                                </div>

                                {videoType === 'youtube' ? (
                                    <input
                                        type="text"
                                        value={videoUrl}
                                        onChange={e => setVideoUrl(e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full bg-[#f8f0dd]/30 border border-black/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary"
                                    />
                                ) : videoType === 'instagram' ? (
                                    <input
                                        type="text"
                                        value={videoUrl}
                                        onChange={e => setVideoUrl(e.target.value)}
                                        placeholder="https://www.instagram.com/p/..."
                                        className="w-full bg-[#f8f0dd]/30 border border-black/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary"
                                    />
                                ) : (
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={e => {
                                            if (e.target.files?.[0]) {
                                                setVideoFile(e.target.files[0]);
                                            }
                                        }}
                                        className="w-full text-xs text-black/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-black/5 file:text-black hover:file:bg-black/10 transition-all cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </form>
        </div>
    );
};

export default AdminCreateBlog;
