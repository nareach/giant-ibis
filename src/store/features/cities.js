import { apiSlice } from "../api/api.slide";

export const citiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCity: builder.query({
            query: () => ({
                url: `/city-detail`,
                method: "GET"
            })
        }),
        getCitesByOrigin: builder.query({
            query: ({ originId }) => ({
                url: `/city-detail?originId=${originId}`,
                method: "GET"
            })
        }),
    }),
    overrideExisting: false
});

export const { useGetAllCityQuery, useLazyGetCitesByOriginQuery } = citiesApiSlice;