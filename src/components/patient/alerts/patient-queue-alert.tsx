import FloatingAlert from '@/components/ui/floating-alert';
import { useEffect, useState } from 'react';

interface IPatientQueueAlertProps {
  id: string;
}

export const PatientQueueAlert = ({ id }: IPatientQueueAlertProps) => {
  const [isInQueue, setIsInQueue] = useState(false);

  const handleServeNow = () => {
    setIsInQueue(false);
  };

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsInQueue(true);
      }, 1000);
    })();
  }, []);

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
            <span className="font-bold">Tambling, Ben</span> is currently in
            queue #12
          </span>
        </>
      }
    />
  );
};
