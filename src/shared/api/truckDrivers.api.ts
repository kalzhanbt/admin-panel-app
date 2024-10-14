import baseApi from "./baseApi";
import { TTruckDriver } from "../types";

export const truckDriverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTruckDrivers: builder.query<TTruckDriver[], void>({
      query: () => ({
        url: "/truck-drivers",
      }),
    }),
    createTruckDriver: builder.mutation<TTruckDriver, TTruckDriver>({
      query: (body) => ({
        url: "/truck-drivers",
        method: "POST",
        body: body,
      }),
    }),
    updateTruckDriver: builder.mutation<TTruckDriver, {id: number | string, body: TTruckDriver}>({
      query: ({ id, body }) => ({
        url: `/truck-drivers/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteTruckDriver: builder.mutation<object, number | string>({
      query: (id) => ({
        url: `/truck-drivers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTruckDriversQuery,
  useCreateTruckDriverMutation,
  useDeleteTruckDriverMutation,
  useUpdateTruckDriverMutation,
} = truckDriverApi;
