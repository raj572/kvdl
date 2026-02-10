import { useEffect, useState } from 'react';
import BlogContentRenderer from '../../components/blog/BlogContentRenderer';

const AdminBlogPreview = () => {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('admin_blog_preview');
        if (stored) {
            try {
                setBlog(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse preview data", e);
            }
        }
    }, []);

    if (!blog) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-background">
                <p>Loading preview...</p>
            </div>
        );
    }

    return (
        <div className="min-h-dvh bg-background pt-32 pb-20">
            <article className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="mb-6 flex items-center justify-center gap-2 text-sm uppercase tracking-widest opacity-60 font-[sansation]">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{blog.author || 'Preview Author'}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[arkhip] leading-tight mb-8">
                        {blog.title || 'Untitled Blog Post'}
                    </h1>
                </header>

                {/* Content */}
                <BlogContentRenderer content={blog.content} />
            </article>

            {/* Preview Banner */}
            <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-center z-50 uppercase tracking-widest text-xs font-bold">
                Preview Mode - Content not saved
            </div>
        </div>
    );
};

export default AdminBlogPreview;
