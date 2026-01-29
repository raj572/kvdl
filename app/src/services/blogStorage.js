const STORAGE_KEY = 'kvdl_admin_blogs';

const readBlogs = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
};

const writeBlogs = (blogs) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
};

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `blog_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const getBlogs = () => {
    return readBlogs().sort((a, b) => {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return bTime - aTime;
    });
};

export const createBlog = (blog) => {
    const blogs = readBlogs();
    const now = new Date().toISOString();
    const newBlog = {
        id: generateId(),
        title: blog.title?.trim(),
        author: blog.author?.trim() || 'Admin',
        excerpt: blog.excerpt?.trim() || '',
        content: blog.content?.trim(),
        coverUrl: blog.coverUrl?.trim() || '',
        createdAt: now,
        updatedAt: now
    };

    const nextBlogs = [newBlog, ...blogs];
    writeBlogs(nextBlogs);
    return newBlog;
};

export const deleteBlog = (blogId) => {
    const blogs = readBlogs();
    const nextBlogs = blogs.filter((blog) => blog.id !== blogId);
    writeBlogs(nextBlogs);
};

export const updateBlog = (blogId, updates) => {
    const blogs = readBlogs();
    const nextBlogs = blogs.map((blog) => {
        if (blog.id !== blogId) {
            return blog;
        }

        return {
            ...blog,
            ...updates,
            updatedAt: new Date().toISOString()
        };
    });
    writeBlogs(nextBlogs);
};
