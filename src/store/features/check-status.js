import { apiSlice } from "../api/api.slide";

export const checkStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkStatus: builder.query({
            query: ({ tranId, refCode }) => ({
                url: `/check-status/${tranId}?refCode=${refCode}`,
                method: "GET"
            })
        }),
    }),
    overrideExisting: false
});

export const { useCheckStatusQuery } = checkStatusApiSlice;