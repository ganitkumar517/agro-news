import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURl = process.env.NEXT_PUBLIC_BASE_URL;

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.epicred.in/api/v1",
    }),
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: (params) => ({
                method: "get",
                url: "/courses/all-courses",
                params
            }),
        }),
    }),
});

export const {
    useGetAllCoursesQuery,
} = homeApi;