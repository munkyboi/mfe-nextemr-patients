import { Button } from '../ui/button';
import QueueItem from './queue-item';
import { ScrollArea } from '../ui/scroll-area';
import { IPatient, usePatients } from '@/app/context/patients.context';
import { getPatientFullName } from '@/lib/utils';
import { useCallback, useMemo } from 'react';
import QueueWidgetActiveFilter from './queue-widget-active-filter';

export type IQueueStatus =
  | 'in-progress'
  | 'cancelled'
  | 'notified'
  | 're-scheduled'
  | 'billed'
  | 'paid'
  | 'completed'
  | 'queued';
export interface IQueueItem extends IPatient {
  status: IQueueStatus;
}

export default function QueueWidget() {
  const { patients } = usePatients();
  /**
   * create a temporary queue list
   */
  const generateRandomStatus = () => {
    const status = [
      'in-progress',
      'cancelled',
      'notified',
      're-scheduled',
      'billed',
      'paid',
      'completed',
      'queued'
    ];
    const rand = Math.floor(Math.random() * 8);
    return status[rand] as IQueueStatus;
  };
  const generateRandomPatient = useCallback(
    (arr: IPatient[], count: number, result: IQueueItem[] = []) => {
      if (result.length === count) {
        return result;
      }
      const randomIndex = Math.floor(Math.random() * arr.length);
      const item = {
        ...arr[randomIndex],
        status: generateRandomStatus()
      };
      if (!result.includes(item)) {
        result.push(item);
      }
      return generateRandomPatient(arr, count, result);
    },
    []
  );
  const queueItems: IQueueItem[] = useMemo(
    () => generateRandomPatient(patients, 20),
    [generateRandomPatient, patients]
  );
  let currentServed: string | null = null;
  if (queueItems) {
    if (queueItems.find((item) => item.status === 'in-progress')) {
      currentServed = getPatientFullName(
        queueItems.find((item) => item.status === 'in-progress')
      );
    }
  }
  if (!patients) return null;
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
            <div className="font-bold break-keep">6hrs 46mins</div>
          </div>
        </div>
      </div>
      <div className="px-2 mb-4 w-full">
        <div className="flex flex-row items-center flex-nowrap gap-2">
          <div className="text-xs grow">
            <span className="font-bold">12</span> patients in-queue
          </div>
          <div className="text-right">
            <QueueWidgetActiveFilter />
          </div>
        </div>
        <ScrollArea className="h-[calc(100dvh-230px)] md:h-64 w-full rounded-md border">
          <div className="grid grid-cols-1 gap-0">
            {queueItems.map((patient, index) => (
              <QueueItem
                key={`${patient.id}-${patient.first_name}-${patient.last_name}`}
                index={index + 1}
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
