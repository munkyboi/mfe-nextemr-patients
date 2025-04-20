import FloatingAlert from '@/components/ui/floating-alert';
import { usePatients } from '@/context/patients.context';
import { useQueue } from '@/context/queue.context';
import { getPatientFullName } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const PatientQueueAlert = () => {
  const { selectedPatient } = usePatients();
  const { queue } = useQueue();
  const [isInQueue, setIsInQueue] = useState(false);
  const [queueIndex, setQueueIndex] = useState<number | undefined>();

  const handleServeNow = () => {
    setIsInQueue(false);
  };

  useEffect(() => {
    if (queue && selectedPatient) {
      const qIndex = queue.map((q) => q.patient_id).indexOf(selectedPatient.id);
      setQueueIndex(+qIndex + 1);
      setIsInQueue(qIndex > -1);
    }
  }, [queue, selectedPatient]);

  return (
    <FloatingAlert
      variant="positive"
      open={isInQueue}
      onOpenChange={setIsInQueue}
      actionButton={{
        label: 'Serve now',
        onClick: handleServeNow
      }}
      description={
        <>
          <span>
            <span className="font-bold">
              {getPatientFullName(selectedPatient)}
            </span>{' '}
            is currently in queue #{queueIndex}
          </span>
        </>
      }
    />
  );
};
