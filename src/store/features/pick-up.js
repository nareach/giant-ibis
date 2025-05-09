import { apiSlice } from "../api/api.slide";

export const puckUpApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPickUpByCityId: builder.query({
            query: ({ cityId }) => ({
                url: `/pick-up/${cityId}`,
                method: "GET"
            })
        }),
    }),
    overrideExisting: false
});

export const { useGetPickUpByCityIdQuery, useLazyGetPickUpByCityIdQuery } = puckUpApiSlice;