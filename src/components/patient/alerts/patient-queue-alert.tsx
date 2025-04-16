import FloatingAlert from '@/components/ui/floating-alert';
import { useEffect, useState } from 'react';

export const PatientQueueAlert = () => {
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
