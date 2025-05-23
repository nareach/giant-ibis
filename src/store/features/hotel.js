import { apiSlice } from "../api/api.slide";

export const hotelsApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getHotelByCityId: builder.query({
            query: (id) => ({
                url: `/hotels/${id}`,
                method: "GET"
            })
        }),
    }),
    overrideExisting: false
});

export const { useGetHotelByCityIdQuery, useLazyGetHotelByCityIdQuery } = hotelsApiSlice;