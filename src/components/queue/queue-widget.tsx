import { Button } from '../ui/button';
import QueueItem from './queue-item';
import { ScrollArea } from '../ui/scroll-area';
import { usePatients } from '@/context/patients.context';
import { filterQUeue, getPatientFullName } from '@/lib/utils';
import QueueWidgetActiveFilter from './queue-widget-active-filter';
import { useQueue } from '@/context/queue.context';
import { useLazyGetQueueListQuery } from '@/lib/api/queue.api';
import { QueueWidgetSkeleton } from './queue-widget.skeleton';

export default function QueueWidget() {
  const { patients } = usePatients();
  const { queue, filters, addToQueue } = useQueue();
  const [
    triggerFetchQueryList,
    { data: queueData, isFetching, isLoading, isSuccess, isUninitialized }
  ] = useLazyGetQueueListQuery();

  if (isUninitialized) triggerFetchQueryList();

  if (!queue || !patients || isLoading) return <QueueWidgetSkeleton />;

  let currentServed: string | null = null;
  let filteredQueue;

  if (isSuccess) {
    addToQueue(queueData.data);
  }

  if (queue) {
    if (queue.find((item) => item.status === 'in-progress')) {
      const inProgressQueue = queue.filter(
        (item) => item.status === 'in-progress'
      )[0];
      const inProgressPatient = patients.filter(
        (patient) => patient.id === inProgressQueue.patient_id
      )[0];
      currentServed = getPatientFullName(inProgressPatient);
    }
    filteredQueue = filterQUeue(queue, filters);
  }

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
        <QueueWidgetActiveFilter isFetching={isFetching} />
        <ScrollArea className="h-[calc(100dvh-230px)] md:h-64 w-full rounded-md border">
          <div className="grid grid-cols-1 gap-0">
            {filteredQueue.length === 0 ? (
              <div className="relative flex flex-col items-center justify-between px-2 py-2 text-gray-400 text-sm">
                Queue is empty...
              </div>
            ) : (
              filteredQueue.map((queue, index) => (
                <QueueItem key={`${queue.id}`} index={index} queue={queue} />
              ))
            )}
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
