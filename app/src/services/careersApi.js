import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAdminToken } from '../admin/adminAuth';

// Define the base URL
const API_BASE_URL = 'http://localhost:8000/api';

export const careersApi = createApi({
  reducerPath: 'careersApi',
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
  tagTypes: ['Applications'],
  endpoints: (builder) => ({
    // Public: Apply for a job
    applyForJob: builder.mutation({
      query: (formData) => ({
        url: '/careers/apply',
        method: 'POST',
        body: formData, // FormData matches multipart/form-data
      }),
    }),
    
    // Admin: Get all applications
    getApplications: builder.query({
      query: () => '/admin/careers',
      providesTags: ['Applications'],
    }),

    // Admin: Update status
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/careers/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Applications'],
    }),
  }),
});

export const {
  useApplyForJobMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = careersApi;
