import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../endpoints';
import { IResponse } from './api.types';
// import { FABIRCATE_TOKEN } from './api.constants';
import { IQueue } from '@/context/queue.context';
import { validateStatus } from '../utils';

// type IAddToQueueBody = Omit<
//   IQueue,
//   'id' | 'ticket_number' | 'date_created' | 'last_updated' | 'status'
// >;

interface IAddToQueueResponse {
  batchQueue: IQueue[];
  created: IQueue;
}

export const queueApi = createApi({
  reducerPath: 'queueApi',
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
    getQueueList: builder.query<IResponse<IQueue[]>, void>({
      query: () => ({
        url: ENDPOINTS.GET_ALL_QUEUE,
        method: 'GET',
        validateStatus: validateStatus
      }),
      keepUnusedDataFor: 5
    }),
    getQueueById: builder.query<IResponse<IQueue>, string>({
      query: (queueId: string) => ({
        url: `${ENDPOINTS.GET_ALL_QUEUE}/${queueId}`,
        method: 'GET',
        validateStatus: validateStatus
      }),
      keepUnusedDataFor: 5
    }),
    addToQueue: builder.mutation<IResponse<IAddToQueueResponse>, unknown>({
      query: (body) => ({
        url: ENDPOINTS.ADD_TO_QUEUE,
        method: 'POST',
        body,
        validateStatus: validateStatus
      })
    })
  })
});

export const {
  useGetQueueListQuery,
  useGetQueueByIdQuery,
  useLazyGetQueueListQuery,
  useAddToQueueMutation
} = queueApi;
