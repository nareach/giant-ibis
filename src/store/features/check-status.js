import { apiSlice } from "../api/api.slide";

export const checkStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkStatus: builder.query({
            query: ({ tranId, refCode }) => ({
                url: `/check-status/${tranId}?refCode=${refCode}`,
                method: "GET"
            })
        }),
        checkStatusRoundTrip: builder.query({
            query: ({ tranId, refCode, refCodeRoundTrip }) => ({
                url: `/check-status/${tranId}?refCode=${refCode}&refCodeRoundTrip=${refCodeRoundTrip}&tripType=round-trip`,
                method: "GET"
            })
        })
    }),
    overrideExisting: false
});

export const { useCheckStatusQuery, useCheckStatusRoundTripQuery } = checkStatusApiSlice;