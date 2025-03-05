import { apiSlice } from "@/lib/store/api/apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCityList: builder.mutation({
      query: () => {
        const formData = new FormData();
        formData.append("api_function", "get_cityList");

        return {
          url: "https://www.giantibis.com/beta1/api-booking.php",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ["CityList"],
    }),
  }),
});

export const { useGetCityListMutation } = bookingApiSlice;
