import baseApi from "./baseApi";
import { TTruck } from "../types";

export const trucksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrucks: builder.query<TTruck[], void>({
      query: () => ({
        url: "/trucks",
      }),
    }),
    createTruck: builder.mutation<TTruck, TTruck>({
      query: (body) => ({
        url: "/trucks",
        method: "POST",
        body: body,
      }),
    }),
    updateTruck: builder.mutation<TTruck, {id: number | string, body: TTruck}>({
      query: ({ id, body }) => ({
        url: `/trucks/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteTruck: builder.mutation<object, number | string>({
      query: (id) => ({
        url: `/trucks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTrucksQuery,
  useCreateTruckMutation,
  useDeleteTruckMutation,
  useUpdateTruckMutation,
} = trucksApi;
