// Need to use the React-specific entry point to import createApi
import { API_URL_NEXT } from "@/constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from 'next-redux-wrapper'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL_NEXT,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  }
});


function isHydrateAction(action) {
  return action.type === HYDRATE
}

// create api slice with custom base query
export const apiSlice = createApi({
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({})
});
