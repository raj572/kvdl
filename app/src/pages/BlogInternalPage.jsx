import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogContentRenderer from '../components/blog/BlogContentRenderer';
import { getBlogById, getImageUrl } from '../services/api';

const BlogInternalPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id);
                if (response?.success) {
                    setBlog(response.data);
                } else {
                    setError('Blog not found');
                }
            } catch (err) {
                setError('Failed to load story.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center bg-background gap-4">
                <p className="text-xl text-primary font-[sansation]">{error || 'Story not found.'}</p>
                <button
                    onClick={() => navigate('/blog')}
                    className="px-6 py-2 border border-foreground rounded-full hover:bg-foreground hover:text-background transition-all"
                >
                    Back to Stories
                </button>
            </div>
        );
    }

    const coverImage = getImageUrl(blog.cover_url);

    return (
        <div className="min-h-dvh bg-background pt-32 pb-20">
            <article className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="mb-6 flex items-center justify-center gap-2 text-sm uppercase tracking-widest opacity-60 font-[sansation]">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{blog.author || 'KVDL Team'}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[arkhip] leading-tight mb-8">
                        {blog.title}
                    </h1>
                </header>

                {/* Content */}
                <BlogContentRenderer content={blog.content} />

                {/* Footer */}
                <div className="mt-20 pt-10 border-t border-foreground/10 text-center">
                    <button
                        onClick={() => navigate('/blog')}
                        className="px-8 py-3 border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all uppercase tracking-widest text-sm"
                    >
                        Back to Stories
                    </button>
                </div>
            </article>
        </div>
    );
};

export default BlogInternalPage;
