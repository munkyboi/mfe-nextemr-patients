import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../endpoints';
import { IResponse } from './api.types';
// import { FABIRCATE_TOKEN } from './api.constants';
import { IPhysician } from '@/context/physicians.context';
import { validateStatus } from '../utils';

export const physiciansApi = createApi({
  reducerPath: 'physiciansApi',
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
    getPhysiciansList: builder.query<IResponse<IPhysician[]>, void>({
      query: () => ({
        url: ENDPOINTS.GET_ALL_PHYSICIANS,
        method: 'GET',
        validateStatus: validateStatus
      }),
      keepUnusedDataFor: 60
    }),
    getPhysicianById: builder.query<IResponse<IPhysician>, string>({
      query: (id) => ({
        url: `${ENDPOINTS.GET_ALL_PHYSICIANS}/${id}`,
        method: 'GET',
        validateStatus: validateStatus
      }),
      keepUnusedDataFor: 60
    })
  })
});

export const {
  useGetPhysiciansListQuery,
  useLazyGetPhysiciansListQuery,
  useGetPhysicianByIdQuery
} = physiciansApi;
