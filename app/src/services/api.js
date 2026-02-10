// API Configuration
import { getAdminToken } from '../admin/adminAuth';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Get full image URL
 * @param {string} path - Image path from backend
 * @returns {string} - Full URL
 */
export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path; // Already a full URL
    
    // Clean potential double slashes if API_BASE_URL ends with / and path starts with /
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // Encode the path to handle spaces and special chars
    // We use encodeURI to preserve slashes but encode spaces/commas
    return `${baseUrl}${encodeURI(cleanPath)}`;
};

/**
 * Make an API request
 * @param {string} endpoint - API endpoint (e.g., '/api/contact')
 * @param {object} options - Fetch options
 * @returns {Promise} - Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Accept': 'application/json',
            ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        },
    };

    const token = getAdminToken();
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };

    try {
        console.log('Making API request to:', url);
        console.log('Request config:', config);
        
        const response = await fetch(url, config);

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        const responseText = await response.text();
        let data = null;

        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                throw {
                    status: response.status,
                    message: 'Invalid server response',
                    errors: {},
                    cause: parseError
                };
            }
        }

        console.log('Response data:', data);

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'An error occurred',
                errors: data.errors || {},
            };
        }

        return data ?? {};
    } catch (error) {
        console.error('API Request Error:', error);
        
        // Check if it's a network error (fetch failed)
        if (error instanceof TypeError && error.message.includes('fetch')) {
            console.error('Network error - Cannot connect to backend server');
            throw {
                status: null,
                message: 'Cannot connect to server. Please ensure the backend is running at ' + API_BASE_URL,
                errors: {},
            };
        }
        
        // Re-throw the error for handling in the component
        throw error;
    }
};

/**
 * Submit contact form
 * @param {object} formData - Contact form data
 * @returns {Promise} - Response data
 */
export const submitContactForm = async (formData) => {
    return apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
};

/**
 * Get all contacts (for admin)
 * @returns {Promise} - Response data
 */
export const getContacts = async () => {
    return apiRequest('/api/contacts', {
        method: 'GET',
    });
};

/**
 * Get all blogs (for admin or public)
 * @returns {Promise} - Response data
 */
export const getBlogs = async () => {
    return apiRequest('/api/blogs', {
        method: 'GET',
    });
};

export const getBlogById = async (id) => {
    return apiRequest(`/api/blogs/${id}`, {
        method: 'GET',
    });
};

/**
 * Create a blog post
 * @param {object} blogData - Blog form data
 * @returns {Promise} - Response data
 */
export const createBlog = async (blogData) => {
    return apiRequest('/api/blogs', {
        method: 'POST',
        body: blogData, // Can be JSON string or FormData
    });
};

/**
 * Upload media for a blog post (Content Blocks)
 * @param {File} file - Image file
 * @returns {Promise} - Response data with url
 */
export const uploadBlogMedia = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiRequest('/api/blogs/upload-media', {
        method: 'POST',
        body: formData,
    });
};

/**
 * Update a blog post
 * @param {number|string} id - Blog ID
 * @param {object} blogData - Blog form data
 * @returns {Promise} - Response data
 */
export const updateBlog = async (id, blogData) => {
    return apiRequest(`/api/blogs/${id}`, {
        method: 'POST', // Using POST for file upload support (Laravel method spoofing if needed)
        body: blogData,
    });
};

/**
 * Delete a blog post
 * @param {number|string} blogId - Blog ID
 * @returns {Promise} - Response data
 */
export const deleteBlog = async (blogId) => {
    return apiRequest(`/api/blogs/${blogId}`, {
        method: 'DELETE',
    });
};

/**
 * Admin login
 * @param {object} credentials - Login credentials
 * @returns {Promise} - Response data
 */
export const adminLogin = async (credentials) => {
    return apiRequest('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

/**
 * Admin session check
 * @returns {Promise} - Response data
 */
export const adminMe = async () => {
    return apiRequest('/api/admin/me', {
        method: 'GET',
    });
};

/**
 * Admin logout
 * @returns {Promise} - Response data
 */
export const adminLogout = async () => {
    return apiRequest('/api/admin/logout', {
        method: 'POST',
    });
};

export default {
    submitContactForm,
    getContacts,
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    adminLogin,
    adminMe,
    adminLogout,
};
