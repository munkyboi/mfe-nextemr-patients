import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../endpoints';
import { IResponse } from './api.types';
import { FABIRCATE_TOKEN } from './api.constants';
import { IQueue } from '@/context/queue.context';

export const queueApi = createApi({
  reducerPath: 'queueApi',
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
    getQueueList: builder.query<IResponse<IQueue[]>, void>({
      query: () => ENDPOINTS.GET_ALL_QUEUE,
      keepUnusedDataFor: 5
    }),
    getQueueById: builder.query<IResponse<IQueue>, string>({
      query: (queueId: string) => `${ENDPOINTS.GET_ALL_QUEUE}/${queueId}`,
      keepUnusedDataFor: 5
    })
  })
});

export const {
  useGetQueueListQuery,
  useGetQueueByIdQuery,
  useLazyGetQueueListQuery
} = queueApi;
