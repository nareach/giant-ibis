import { apiSlice } from "../api/api.slide";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        generateQR: builder.mutation({
            query: (body) => ({
                url: "open-session",
                method: "POST",
                body
            })
        }),
    }),
    overrideExisting: false
});

export const { useGenerateQRMutation } = paymentApiSlice;