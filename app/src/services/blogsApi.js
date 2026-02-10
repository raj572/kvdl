import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAdminToken } from '../admin/adminAuth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAdminToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Blogs', 'Blog'],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/api/blogs',
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Blogs', id })),
              { type: 'Blogs', id: 'LIST' },
            ]
          : [{ type: 'Blogs', id: 'LIST' }],
      // Transform response to match the format used in components if needed
      // transformResponse: (response) => response, 
    }),
    getBlogById: builder.query({
      query: (id) => `/api/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/api/blogs',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...updatedBlog }) => ({
        url: `/api/blogs/${id}`,
        method: 'POST', // Using POST for file upload support (Laravel method spoofing if needed) or PUT/PATCH
        body: updatedBlog,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Blog', id },
        { type: 'Blogs', id: 'LIST' },
      ],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Blogs', id: 'LIST' },
        { type: 'Blog', id },
      ],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
