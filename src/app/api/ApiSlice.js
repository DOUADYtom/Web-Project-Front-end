import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3300"}),
    tagTypes: ['Monument', 'User', 'Review'],
    endpoints: builder => ({})
});