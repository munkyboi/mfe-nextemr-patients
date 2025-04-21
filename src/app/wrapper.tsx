import { usePatients } from '@/context/patients.context';
import { useQueue } from '@/context/queue.context';
import { useGetPatientsQuery } from '@/lib/api/patients.api';
import { useGetQueueListQuery } from '@/lib/api/queue.api';
import { PropsWithChildren } from 'react';

export function InitializeWrapper({ children }: PropsWithChildren) {
  const { saveAllPatients } = usePatients();
  const { addToQueue } = useQueue();
  const { data: patientsListData, isLoading: patientsIsLoading } =
    useGetPatientsQuery();
  const { data: queueListData, isLoading: queueIsLoading } =
    useGetQueueListQuery(undefined, {
      pollingInterval: 60000
    });
  const isLoading = patientsIsLoading || queueIsLoading;

  if (isLoading) return 'Loading...';

  saveAllPatients(patientsListData?.data);
  addToQueue(queueListData?.data);

  return <>{children}</>;
}
