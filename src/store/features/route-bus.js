import { apiSlice } from "../api/api.slide";

export const routeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoute: builder.query({
      query: ({ origin, destination, travelDate }) => ({
        url: `/routes-bus?origin=${origin}&destination=${destination}&travelDate=${travelDate}`,
        method: "GET"
      })
    }),
  }),
  overrideExisting: false
});

export const { useLazyGetRouteQuery, useGetRouteQuery } = routeApiSlice;