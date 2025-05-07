import { apiSlice } from "../api/api.slide";

export const citiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCity: builder.query({
            query: () => ({
                url: `/city-detail`,
                method: "GET"
            })
        }),
    }),
    overrideExisting: false
});

export const { useGetAllCityQuery } = citiesApiSlice;