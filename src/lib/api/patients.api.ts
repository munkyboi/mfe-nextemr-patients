import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../endpoints';
import { IResponse } from './api.types';
import { IPatient } from '@/context/patients.context';

export const FABIRCATE_TOKEN = process.env.NEXT_PUBLIC_FABRICATE_TOKEN || '';

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${FABIRCATE_TOKEN}`); // 🔐 Custom Header
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPatients: builder.query<IResponse<IPatient[]>, void>({
      query: () => ENDPOINTS.GET_ALL_PATIENTS,
      keepUnusedDataFor: 60
    }),
    getPatientById: builder.query<IResponse<IPatient>, string>({
      query: (userId: string) => `${ENDPOINTS.GET_ALL_PATIENTS}/${userId}`,
      keepUnusedDataFor: 60
    })
  })
});

export const {
  useGetPatientsQuery,
  useLazyGetPatientByIdQuery,
  useGetPatientByIdQuery
} = patientsApi;
