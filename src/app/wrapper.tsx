import { usePatients } from '@/context/patients.context';
import { usePhysicians } from '@/context/physicians.context';
import { useQueue } from '@/context/queue.context';
import { QUEUE_POLLING } from '@/lib/api/api.constants';
import { useLazyGetPatientsQuery } from '@/lib/api/patients.api';
import { useLazyGetPhysiciansListQuery } from '@/lib/api/physicians.api';
import { useLazyGetQueueListQuery } from '@/lib/api/queue.api';
import { PropsWithChildren, useEffect } from 'react';

export function InitializeWrapper({ children }: PropsWithChildren) {
  const { saveAllPatients } = usePatients();
  const { saveAllQueue } = useQueue();
  const { saveAllPhysicians } = usePhysicians();
  const [getPatients, { isLoading: patientsIsLoading }] =
    useLazyGetPatientsQuery();
  const [getQueueList, { data: queueListData, isLoading: queueIsLoading }] =
    useLazyGetQueueListQuery({
      pollingInterval: +QUEUE_POLLING
    });
  const [getPhysicians, { isLoading: physiciansIsLoading }] =
    useLazyGetPhysiciansListQuery();
  const isLoading = patientsIsLoading || queueIsLoading || physiciansIsLoading;

  useEffect(() => {
    (async () => {
      try {
        const patientsResult = await getPatients().unwrap();
        saveAllPatients(patientsResult.data);
      } catch (error) {
        console.log(`Getting patients list failed - ${error}`);
      }
      try {
        const physiciansResult = await getPhysicians().unwrap();
        saveAllPhysicians(physiciansResult.data);
      } catch (error) {
        console.log(`Getting physicians list failed - ${error}`);
      }
      try {
        const queueResult = await getQueueList().unwrap();
        saveAllQueue(queueResult.data);
      } catch (error) {
        console.log(`Getting queue list failed - ${error}`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (queueListData) saveAllQueue(queueListData.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueListData]);

  if (isLoading) {
    return (
      <div className="w-[100svw] h-[100svh] flex flex-row justify-center items-center">
        <h1 className="text-xl font-thin text-gray-900">
          Next<span className="text-blue-500 font-bold">EMR</span>
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}
