import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  score: number;
  timestamp: Date;
}

export const applicantApi = createApi({
  reducerPath: "applicantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Applicant"],
  endpoints: (builder) => ({
    // Get all applicants
    getApplicants: builder.query<Applicant[], void>({
      query: () => "applicants",
      providesTags: ["Applicant"],
    }),
  }),
});

export const { useGetApplicantsQuery } = applicantApi;
