import { Button } from '../ui/button';
import QueueItem from './queue-item';
import { ScrollArea } from '../ui/scroll-area';
import { usePatients } from '@/context/patients.context';
import { filterQUeue, getPatientFullName } from '@/lib/utils';
import QueueWidgetActiveFilter from './queue-widget-active-filter';
import { useQueue } from '@/context/queue.context';
import { useEffect } from 'react';
import { ENDPOINTS } from '@/data-manager/endpoints';
import { getCommonHeaders } from '@/data-manager/helpers';

export default function QueueWidget() {
  const { patients } = usePatients();
  const { queue, filters, addToQueue } = useQueue();

  useEffect(() => {
    (async () => {
      const queue_response = await fetch(`${ENDPOINTS.GET_ALL_QUEUE}`, {
        method: 'GET',
        headers: getCommonHeaders()
      });
      const { data: queueData } = await queue_response.json();
      addToQueue(queueData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!patients || !queue) return null;

  let currentServed: string | null = null;
  if (queue) {
    if (queue.find((item) => item.status === 'in-progress')) {
      const inProgressId = queue.filter(
        (item) => item.status === 'in-progress'
      )[0];
      const inProgressPatient = patients.filter(
        (inProgressPatient) => inProgressPatient.id === inProgressId.patient_id
      )[0];
      currentServed = getPatientFullName(inProgressPatient);
    }
  }

  if (!patients || !queue) return null;

  const filteredQueue = filterQUeue(queue, filters);

  return (
    <div className="py-2">
      <div className="px-2">
        <div className="w-full flex flex-nowrap gap-4">
          <div className="grow overflow-hidden">
            <h4 className="w-full text-lg leading-6 truncate">
              <span>Currently serving</span>{' '}
              <span className="font-bold">{currentServed || 'N/A'}</span>
            </h4>
            <p className="text-sm text-gray-400 leading-6">
              Scheduled medical appointments
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Elapsed time</div>
            <div className="font-bold break-keep">6h 46m</div>
          </div>
        </div>
      </div>
      <div className="px-2 mb-4 w-full">
        <QueueWidgetActiveFilter />
        <ScrollArea className="h-[calc(100dvh-230px)] md:h-64 w-full rounded-md border">
          <div className="grid grid-cols-1 gap-0">
            {filteredQueue.map((queue, index) => (
              <QueueItem key={`${queue.id}`} index={index} queue={queue} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="px-2">
        <Button className="w-full">Schedule New Appointment</Button>
      </div>
    </div>
  );
}

export { QueueWidget };
