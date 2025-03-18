// Need to use the React-specific entry point to import createApi
import { API_URL } from "@/constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  }
});

// create api slice with custom base query
export const apiSlice = createApi({
  // tagTypes: ["User"], // tagTypes are used for cache invalidation
  baseQuery,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({})
});
