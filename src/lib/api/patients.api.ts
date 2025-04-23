import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../endpoints';
import { IResponse } from './api.types';
import { IPatient } from '@/context/patients.context';
import { FABIRCATE_TOKEN } from './api.constants';
import { validateStatus } from '../utils';

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      // headers.set('Authorization', `Bearer ${FABIRCATE_TOKEN}`); // 🔐 Custom Header
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPatients: builder.query<IResponse<IPatient[]>, void>({
      query: () => ({
        url: ENDPOINTS.GET_ALL_PATIENTS,
        method: 'GET',
        validateStatus: validateStatus
      }),
      keepUnusedDataFor: 60
    }),
    getPatientById: builder.query<IResponse<IPatient>, string>({
      query: (userId: string) => ({
        url: `${ENDPOINTS.GET_ALL_PATIENTS}/${userId}`,
        method: 'GET',
        validateStatus: validateStatus
      }),
      keepUnusedDataFor: 60
    })
  })
});

export const {
  useGetPatientsQuery,
  useLazyGetPatientsQuery,
  useLazyGetPatientByIdQuery,
  useGetPatientByIdQuery
} = patientsApi;
