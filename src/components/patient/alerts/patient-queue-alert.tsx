import FloatingAlert, {
  IFloatAlertVariants
} from '@/components/ui/floating-alert';
import { QUEUE_STATUS, QUEUE_STATUS_TYPE } from '@/constants/queue.constants';
import { usePatients } from '@/context/patients.context';
import { IQueue, IQueueStatus, useQueue } from '@/context/queue.context';
import { useUpdateQueueMutation } from '@/lib/api/queue.api';
import { generateVariantByStatus, getPatientFullName } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const PatientQueueAlert = () => {
  const { queue, saveAllQueue } = useQueue();
  const { selectedPatient } = usePatients();
  const [submitUpdate, { isLoading: updateIsLoading }] =
    useUpdateQueueMutation();

  const [open, setOpen] = useState(false);
  const [qIndex, setQIndex] = useState<number>();
  const [selectedQueue, setSelectedQueue] = useState<IQueue>();

  const handleServeNow = async () => {
    if (qIndex && selectedPatient && selectedQueue) {
      const updateQueue: unknown = {
        ...selectedQueue,
        status: QUEUE_STATUS.IN_PROGRESS as IQueueStatus
      };
      try {
        const submitUpdateResult = await submitUpdate(
          updateQueue as IQueue
        ).unwrap();
        saveAllQueue(submitUpdateResult.data.batchQueue);
        setOpen(false);
      } catch (error) {
        console.log(`Failed to update queue - ${error}`);
      }
    }
  };

  useEffect(() => {
    if (queue && selectedPatient) {
      // const q = queue?.map((i) => i.patient_id).indexOf(selectedPatient.id);
      const q = queue.filter(
        (entry) =>
          entry.patient_id === selectedPatient.id &&
          QUEUE_STATUS_TYPE.ACTIVE.indexOf(entry.status) > -1
      );
      setSelectedQueue(q[0]);
      console.log('🚀 ~ useEffect ~ q:', q);
      setQIndex(q[0]?.queue_index);
      setOpen(q.length > 0);
    }
    if (!selectedPatient) setOpen(false);
  }, [queue, selectedPatient]);

  const variant: IFloatAlertVariants = generateVariantByStatus(
    selectedQueue?.status || ''
  );

  return (
    <FloatingAlert
      variant={variant}
      open={open}
      onOpenChange={setOpen}
      actionButton={
        selectedQueue?.status !== QUEUE_STATUS.IN_PROGRESS
          ? {
              label: 'Serve now',
              onClick: handleServeNow
            }
          : undefined
      }
      description={
        <>
          <span>
            <span className="font-bold">
              {getPatientFullName(selectedPatient)}
            </span>{' '}
            is currently in queue #{qIndex}
          </span>
        </>
      }
      processing={updateIsLoading}
    />
  );
};
