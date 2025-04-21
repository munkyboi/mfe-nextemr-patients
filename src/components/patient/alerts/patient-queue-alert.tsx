import FloatingAlert from '@/components/ui/floating-alert';
import { usePatients } from '@/context/patients.context';
import { useQueue } from '@/context/queue.context';
import { getPatientFullName } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const PatientQueueAlert = () => {
  const { queue } = useQueue();
  const { selectedPatient } = usePatients();
  const [open, setOpen] = useState(false);
  const [qIndex, setQIndex] = useState(-1);

  const handleServeNow = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (queue && selectedPatient) {
      const q = queue?.map((i) => i.patient_id).indexOf(selectedPatient.id);
      setQIndex(q);
      setOpen(q > -1);
    }
    if (!selectedPatient) setOpen(false);
  }, [queue, selectedPatient]);

  return (
    <FloatingAlert
      variant="positive"
      open={open}
      onOpenChange={setOpen}
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
            is currently in queue #{+qIndex + 1}
          </span>
        </>
      }
    />
  );
};
