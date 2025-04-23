import { usePatients } from '@/context/patients.context';
import { usePhysicians } from '@/context/physicians.context';
import { useQueue } from '@/context/queue.context';
import { QUEUE_POLLING } from '@/lib/api/api.constants';
import { useGetPatientsQuery } from '@/lib/api/patients.api';
import { useGetPhysiciansListQuery } from '@/lib/api/physicians.api';
import { useGetQueueListQuery } from '@/lib/api/queue.api';
import { PropsWithChildren } from 'react';

export function InitializeWrapper({ children }: PropsWithChildren) {
  const { saveAllPatients } = usePatients();
  const { addToQueue } = useQueue();
  const { saveAllPhysicians } = usePhysicians();
  const { data: patientsListData, isLoading: patientsIsLoading } =
    useGetPatientsQuery();
  const { data: queueListData, isLoading: queueIsLoading } =
    useGetQueueListQuery(undefined, {
      pollingInterval: +QUEUE_POLLING
    });
  const { data: physiciansListData, isLoading: physiciansIsLoading } =
    useGetPhysiciansListQuery();
  const isLoading = patientsIsLoading || queueIsLoading || physiciansIsLoading;

  if (isLoading)
    return (
      <div className="w-[100svw] h-[100svh] flex flex-row justify-center items-center">
        <h1 className="text-xl font-thin text-gray-900">
          Next<span className="text-blue-500 font-bold">EMR</span>
        </h1>
      </div>
    );

  saveAllPatients(patientsListData?.data);
  addToQueue(queueListData?.data);
  saveAllPhysicians(physiciansListData?.data);

  return <>{children}</>;
}
