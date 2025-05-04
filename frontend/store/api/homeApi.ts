import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURl = process.env.NEXT_PUBLIC_BASE_URL;

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://agro-news.onrender.com/api/",
    }),
    endpoints: (builder) => ({
        getAllNews: builder.query({
            query: (params) => ({
                method: "get",
                url: "/news",
                params
            }),
        }),
    }),
});

export const {
    useGetAllNewsQuery,
} = homeApi;