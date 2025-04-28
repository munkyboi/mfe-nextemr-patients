import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '@/lib/endpoints';
import { IResponse } from '@/lib/api/api.types';
// import { FABIRCATE_TOKEN } from './api.constants';
import { validateStatus } from '../utils';
import { IReferenceData } from '@/context/reference.context';

export const referenceApi = createApi({
  reducerPath: 'referenceApi',
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
    getAllReference: builder.query<IResponse<IReferenceData[]>, void>({
      query: () => ({
        url: ENDPOINTS.GET_ALL_REFERENCE,
        method: 'GET',
        validateStatus: validateStatus
      }),
      keepUnusedDataFor: 60
    })
  })
});

export const { useGetAllReferenceQuery, useLazyGetAllReferenceQuery } =
  referenceApi;
