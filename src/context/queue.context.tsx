// queue.context.js
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IPatient, patient_initalData } from './patients.context';

export type IQueueStatus =
  | 'in-progress'
  | 'cancelled'
  | 'notified'
  | 're-scheduled'
  | 'billed'
  | 'paid'
  | 'completed'
  | 'queued';

export interface IQueue extends IPatient {
  ticket: string;
  status: IQueueStatus;
}

export type QueueFilterType = 'active' | 'inactive' | string;

interface IQueueContext {
  queue: IQueue[] | undefined;
  addToQueue: (payload: IQueue[] | undefined) => void;
  selectedQueue: IQueue | undefined;
  selectQueue: (payload: IQueue | undefined) => void;
  filters: QueueFilterType[] | undefined;
  saveFilter: (payload: QueueFilterType[] | undefined) => void;
}
export const queueItem_initialData = {
  ...patient_initalData,
  ticket: 'N/A',
  status: null
};
export const queue_initialData = [queueItem_initialData];
export const queueContext_initialData = {
  queue: queue_initialData,
  addToQueue: () => {},
  selectedQueue: queueItem_initialData,
  selectQueue: () => {},
  filters: ['active', 'inactive'],
  saveFilter: () => {}
};

// Create the context
const QueueContext = createContext<IQueueContext>(queueContext_initialData);

// Create a provider component
export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<IQueue[] | undefined>();
  const [selectedQueue, setSelectedPatient] = useState<IQueue | undefined>();
  const [filters, setFilters] = useState<QueueFilterType[] | undefined>([
    'active',
    'inactive'
  ]);

  const addToQueue = (payload: IQueue[] | undefined) => {
    console.log(payload);
    setQueue(payload);
  };
  const selectQueue = (patient: IQueue | undefined) =>
    setSelectedPatient(patient);

  const saveFilter = (payload: QueueFilterType[] | undefined) => {
    setFilters(payload);
  };

  return (
    <QueueContext.Provider
      value={{
        queue,
        addToQueue,
        selectedQueue,
        selectQueue,
        filters,
        saveFilter
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

// Custom hook for using the QueueContext
export const useQueue = (): IQueueContext => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
