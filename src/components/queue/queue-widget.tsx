import { Button } from '../ui/button';
import QueueItem from './queue-item';
import { ScrollArea } from '../ui/scroll-area';
import { IPatient, usePatients } from '@/context/patients.context';
import { getPatientFullName } from '@/lib/utils';
// import { useCallback, useMemo } from 'react';
import QueueWidgetActiveFilter from './queue-widget-active-filter';
import { UserRoundCheck, UserMinus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { IQueueStatus, useQueue } from '@/context/queue.context';

export interface IQueueItem extends IPatient {
  status: IQueueStatus;
}

export default function QueueWidget() {
  const { patients } = usePatients();
  const { queue } = useQueue();

  let currentServed: string | null = null;
  if (queue) {
    if (queue.find((item) => item.status === 'in-progress')) {
      currentServed = getPatientFullName(
        queue.find((item) => item.status === 'in-progress')
      );
    }
  }

  if (!patients || !queue) return null;

  const activeItems = queue.filter(
    (item) =>
      item.status === 'in-progress' ||
      item.status === 'queued' ||
      item.status === 'notified' ||
      item.status === 'billed'
  );
  const inactiveItems = queue.filter(
    (item) =>
      item.status === 'cancelled' ||
      item.status === 're-scheduled' ||
      item.status === 'completed' ||
      item.status === 'paid'
  );
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
        <div className="flex flex-row items-center flex-nowrap gap-2">
          <div className="text-[10px]">
            <span className="font-bold">{queue.length}</span> patients in-queue
          </div>
          <div className="grow flex gap-2 justify-end border-r pr-2">
            <Badge variant="default" className="text-[10px] flex gap-2">
              <UserRoundCheck size={10} />
              <span className="font-bold">{activeItems.length}</span>
            </Badge>
            <Badge variant="outline" className="text-[10px] flex gap-2">
              <UserMinus size={10} />
              <span className="font-bold">{inactiveItems.length}</span>
            </Badge>
          </div>
          <div className="text-right">
            <QueueWidgetActiveFilter />
          </div>
        </div>
        <ScrollArea className="h-[calc(100dvh-230px)] md:h-64 w-full rounded-md border">
          <div className="grid grid-cols-1 gap-0">
            {queue.map((patient) => (
              <QueueItem
                key={`${patient.id}-${patient.first_name}-${patient.last_name}`}
                ticket={patient.ticket}
                patient={patient}
              />
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
