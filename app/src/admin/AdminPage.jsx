import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogout, createBlog, deleteBlog, getBlogs, getContacts } from '../services/api';
import { clearAdminToken } from './adminAuth';

const AdminPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('contacts');
    const [contacts, setContacts] = useState([]);
    const [contactsStatus, setContactsStatus] = useState({
        loading: false,
        error: ''
    });

    const [blogs, setBlogs] = useState([]);
    const [blogsStatus, setBlogsStatus] = useState({
        loading: false,
        error: ''
    });
    const [blogForm, setBlogForm] = useState({
        title: '',
        author: '',
        excerpt: '',
        content: '',
        coverUrl: ''
    });
    const [blogErrors, setBlogErrors] = useState({});
    const [blogMessage, setBlogMessage] = useState('');

    const refreshBlogs = async () => {
        setBlogsStatus({ loading: true, error: '' });
        try {
            const response = await getBlogs();
            const data = Array.isArray(response?.data) ? response.data : [];
            const normalized = data.map((blog) => ({
                ...blog,
                coverUrl: blog.cover_url ?? blog.coverUrl ?? '',
                createdAt: blog.created_at ?? blog.createdAt
            }));
            setBlogs(normalized);
        } catch (error) {
            setBlogsStatus({
                loading: false,
                error: error?.message || 'Failed to load blogs.'
            });
            return;
        }
        setBlogsStatus({ loading: false, error: '' });
    };

    const loadContacts = async () => {
        setContactsStatus({ loading: true, error: '' });
        try {
            const response = await getContacts();
            const data = Array.isArray(response?.data) ? response.data : [];
            setContacts(data);
        } catch (error) {
            setContactsStatus({
                loading: false,
                error: error?.message || 'Failed to load contacts.'
            });
            return;
        }
        setContactsStatus({ loading: false, error: '' });
    };

    useEffect(() => {
        loadContacts();
        refreshBlogs();
    }, []);

    const handleBlogChange = (event) => {
        const { name, value } = event.target;
        setBlogForm((prev) => ({
            ...prev,
            [name]: value
        }));

        if (blogErrors[name]) {
            setBlogErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateBlogForm = () => {
        const nextErrors = {};
        if (!blogForm.title.trim()) {
            nextErrors.title = 'Title is required';
        }
        if (!blogForm.content.trim()) {
            nextErrors.content = 'Content is required';
        }
        setBlogErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleCreateBlog = async (event) => {
        event.preventDefault();
        setBlogMessage('');

        if (!validateBlogForm()) {
            return;
        }

        try {
            const response = await createBlog(blogForm);
            if (response?.success === false) {
                setBlogMessage('Blog creation failed.');
                return;
            }
            setBlogForm({
                title: '',
                author: '',
                excerpt: '',
                content: '',
                coverUrl: ''
            });
            await refreshBlogs();
            setBlogMessage('Blog post created.');
        } catch (error) {
            setBlogMessage(error?.message || 'Blog creation failed.');
        }
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            await deleteBlog(blogId);
            await refreshBlogs();
        } catch (error) {
            setBlogMessage(error?.message || 'Blog deletion failed.');
        }
    };

    const formattedContacts = useMemo(() => {
        return contacts.map((contact) => {
            const createdAt = contact.created_at
                ? new Date(contact.created_at).toLocaleString()
                : 'N/A';
            return {
                ...contact,
                createdAt
            };
        });
    }, [contacts]);

    const handleLogout = () => {
        const finishLogout = () => {
            clearAdminToken();
            navigate('/admin/login', { replace: true });
        };

        adminLogout()
            .then(() => finishLogout())
            .catch(() => finishLogout());
    };

    return (
        <div className="min-h-dvh bg-background text-foreground px-6 py-24">
            <div className="mx-auto w-full max-w-6xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-[arkhip] uppercase tracking-[0.35em] text-foreground/60">
                            Admin Panel
                        </p>
                        <h1 className="text-3xl font-[arkhip] tracking-wide sm:text-4xl">
                            Contacts & Blogs
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab('contacts')}
                            className={`rounded-full border px-5 py-2 text-sm uppercase tracking-[0.2em] transition ${activeTab === 'contacts'
                                ? 'border-primary bg-primary text-background'
                                : 'border-foreground/20 text-foreground/70 hover:border-primary/60'
                                }`}
                        >
                            Contacts
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('blogs')}
                            className={`rounded-full border px-5 py-2 text-sm uppercase tracking-[0.2em] transition ${activeTab === 'blogs'
                                ? 'border-primary bg-primary text-background'
                                : 'border-foreground/20 text-foreground/70 hover:border-primary/60'
                                }`}
                        >
                            Blogs
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-full border border-primary/60 px-5 py-2 text-sm uppercase tracking-[0.2em] text-primary transition hover:border-primary"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {activeTab === 'contacts' && (
                    <section className="mt-10 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-xl font-[arkhip] tracking-wide">
                                Contact Submissions
                            </h2>
                            <button
                                type="button"
                                onClick={loadContacts}
                                className="rounded-full border border-primary/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:border-primary"
                            >
                                Refresh
                            </button>
                        </div>

                        {contactsStatus.loading && (
                            <p className="mt-6 text-sm text-foreground/70">
                                Loading contact information...
                            </p>
                        )}

                        {contactsStatus.error && (
                            <p className="mt-6 text-sm text-primary">
                                {contactsStatus.error}
                            </p>
                        )}

                        {!contactsStatus.loading && !contactsStatus.error && formattedContacts.length === 0 && (
                            <p className="mt-6 text-sm text-foreground/70">
                                No contact messages yet.
                            </p>
                        )}

                        <div className="mt-6 grid gap-4">
                            {formattedContacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="rounded-2xl border border-foreground/10 bg-foreground/10 p-5"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <p className="text-lg font-[sansation]">{contact.name}</p>
                                            <p className="text-sm text-foreground/70">{contact.email}</p>
                                            <p className="text-sm text-foreground/70">{contact.phone}</p>
                                        </div>
                                        <div className="text-right text-xs uppercase tracking-[0.2em] text-foreground/60">
                                            {contact.status || 'new'}
                                            <div className="mt-1 text-[11px] normal-case tracking-normal text-foreground/50">
                                                {contact.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid gap-2 text-sm text-foreground/80">
                                        <p>
                                            <span className="text-foreground/50">Subject:</span>{' '}
                                            {contact.subject}
                                        </p>
                                        <p>
                                            <span className="text-foreground/50">Property:</span>{' '}
                                            {contact.property_type || 'N/A'}
                                        </p>
                                        <p className="text-foreground/70">{contact.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'blogs' && (
                    <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                        <form
                            onSubmit={handleCreateBlog}
                            className="rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm"
                        >
                            <h2 className="text-xl font-[arkhip] tracking-wide">
                                Create Blog Post
                            </h2>
                            <div className="mt-6 grid gap-4">
                                <div>
                                    <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                                        Title *
                                    </label>
                                    <input
                                        name="title"
                                        value={blogForm.title}
                                        onChange={handleBlogChange}
                                        className={`mt-2 w-full rounded-2xl border bg-foreground/10 px-4 py-3 text-sm text-foreground ${blogErrors.title
                                            ? 'border-primary'
                                            : 'border-foreground/10'
                                            }`}
                                        placeholder="Blog title"
                                    />
                                    {blogErrors.title && (
                                        <p className="mt-2 text-xs text-primary">{blogErrors.title}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                                        Author
                                    </label>
                                    <input
                                        name="author"
                                        value={blogForm.author}
                                        onChange={handleBlogChange}
                                        className="mt-2 w-full rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm text-foreground"
                                        placeholder="Admin name"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                                        Cover image URL
                                    </label>
                                    <input
                                        name="coverUrl"
                                        value={blogForm.coverUrl}
                                        onChange={handleBlogChange}
                                        className="mt-2 w-full rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm text-foreground"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                                        Excerpt
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={blogForm.excerpt}
                                        onChange={handleBlogChange}
                                        rows="3"
                                        className="mt-2 w-full rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm text-foreground"
                                        placeholder="Short summary for the blog listing"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                                        Content *
                                    </label>
                                    <textarea
                                        name="content"
                                        value={blogForm.content}
                                        onChange={handleBlogChange}
                                        rows="6"
                                        className={`mt-2 w-full rounded-2xl border bg-foreground/10 px-4 py-3 text-sm text-foreground ${blogErrors.content
                                            ? 'border-primary'
                                            : 'border-foreground/10'
                                            }`}
                                        placeholder="Write the full blog post here..."
                                    />
                                    {blogErrors.content && (
                                        <p className="mt-2 text-xs text-primary">{blogErrors.content}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.2em] text-background transition hover:bg-red-700"
                                >
                                    Publish Blog
                                </button>
                                {blogMessage && (
                                    <p className="text-xs uppercase tracking-[0.2em] text-green-400">
                                        {blogMessage}
                                    </p>
                                )}
                            </div>
                        </form>

                        <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
                            <h2 className="text-xl font-[arkhip] tracking-wide">
                                Existing Blogs
                            </h2>
                            {blogsStatus.loading && (
                                <p className="mt-6 text-sm text-foreground/70">
                                    Loading blogs...
                                </p>
                            )}
                            {blogsStatus.error && (
                                <p className="mt-6 text-sm text-primary">
                                    {blogsStatus.error}
                                </p>
                            )}
                            {!blogsStatus.loading && !blogsStatus.error && blogs.length === 0 ? (
                                <p className="mt-6 text-sm text-foreground/70">
                                    No blogs created yet.
                                </p>
                            ) : (
                                <div className="mt-6 grid gap-4">
                                    {blogs.map((blog) => (
                                        <div
                                            key={blog.id}
                                            className="rounded-2xl border border-foreground/10 bg-foreground/10 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-base font-[sansation]">
                                                        {blog.title}
                                                    </p>
                                                    <p className="text-xs text-foreground/60">
                                                        {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteBlog(blog.id)}
                                                    className="rounded-full border border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            {blog.excerpt && (
                                                <p className="mt-3 text-sm text-foreground/70">
                                                    {blog.excerpt}
                                                </p>
                                            )}
                                            {blog.coverUrl && (
                                                <p className="mt-2 text-xs text-foreground/50">
                                                    Cover: {blog.coverUrl}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
