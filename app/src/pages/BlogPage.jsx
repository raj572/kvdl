import { useEffect, useState } from 'react';
import TextScroll from '../components/common/TextScroll';
import { getBlogs } from '../services/api';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs();
      const data = Array.isArray(response?.data) ? response.data : [];
      // Normalize data if needed (though backend seems consistent)
      setBlogs(data);
    } catch (err) {
      setError('Failed to load stories. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-page min-h-dvh">
      {/* STICKY TOP SECTION */}
      <div className="sticky top-0 z-10 w-full">
        <TextScroll
          text="Stories"
          repeat={6}
          duration={100}
          className='pt-24 text-5xl md:pt-40 md:text-7xl lg:text-9xl'
        />
      </div>

      {/* CONTENT BELOW */}
      <div className="blog-hero min-h-dvh bg-background relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24">

          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 font-[sansation] text-lg">{error}</p>
              <button
                onClick={fetchBlogs}
                className="mt-4 px-6 py-2 border border-foreground rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20 opacity-60">
              <p className="font-[sansation] text-xl">No stories published yet.</p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex flex-col h-full bg-foreground/5 border border-foreground/10 rounded-2xl overflow-hidden hover:border-foreground/30 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-foreground/10">
                    {blog.cover_url ? (
                      <img
                        src={blog.cover_url}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                          e.target.parentNode.innerHTML = '<span class="text-4xl text-foreground/20 font-[arkhip]">KVDL</span>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl text-foreground/20 font-[arkhip]">KVDL</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 font-[sansation]">
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{blog.author || 'KVDL Team'}</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-[arkhip] leading-tight mb-4 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-sm md:text-base text-foreground/70 font-[sansation] line-clamp-3 mb-6 flex-grow">
                      {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                    </p>

                    <div className="pt-4 mt-auto border-t border-foreground/10">
                      <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                        Read Story
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BlogPage;