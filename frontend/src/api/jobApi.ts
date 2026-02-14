import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Job } from "../types";


export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Jobs"], // for cache invalidation
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query: () => "jobs",
      providesTags: ["Jobs"],
    }),
    addJob: builder.mutation<Job, Partial<Job>>({
      query: (job) => ({
        url: "jobs",
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["Jobs"], // refresh the jobs list after adding
    }),
  }),
});

export const { useGetJobsQuery, useAddJobMutation } = jobsApi;
