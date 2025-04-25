// queue.context.js
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type IQueueStatus =
  | 'in-progress'
  | 'cancelled'
  | 'notified'
  | 're-scheduled'
  | 'billed'
  | 'paid'
  | 'completed'
  | 'queued';

export interface IQueue {
  id: string;
  physician_id: string;
  patient_id: string;
  note: string;
  queue_index: number;
  queue_batch: string;
  ticket_number: string;
  date_created: string;
  last_updated: string;
  status: IQueueStatus;
}

export type QueueFilterType = 'active' | 'inactive' | string;

interface IQueueContext {
  isOpen: boolean;
  toggleOpen: (e: boolean | undefined) => void;
  queue: IQueue[] | undefined;
  saveAllQueue: (payload: IQueue[] | undefined) => void;
  selectedQueue: IQueue | undefined;
  selectQueue: (payload: IQueue | undefined) => void;
  filters: QueueFilterType[] | undefined;
  saveFilter: (payload: QueueFilterType[] | undefined) => void;
  // updateQueueItem: (payload: IQueue) => void;
  // addToQueue: (payload: IQueue) => void;
  setQueue: React.Dispatch<React.SetStateAction<IQueue[] | undefined>>;
}

// Create the context
const QueueContext = createContext({} as IQueueContext);

// Create a provider component
export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [queue, setQueue] = useState<IQueue[] | undefined>();
  const [selectedQueue, setSelectedPatient] = useState<IQueue | undefined>();
  const [filters, setFilters] = useState<QueueFilterType[] | undefined>([
    'active',
    'inactive'
  ]);

  const saveAllQueue = (payload: IQueue[] | undefined) => {
    console.log('🚀 ~ saveAllQueue ~ payload:', payload);
    setQueue(payload);
  };

  // const updateQueueItem = (payload: IQueue) => {
  //   setQueue((prev) =>
  //     prev?.map((item) =>
  //       item.id === payload.id ? { ...item, ...payload } : item
  //     )
  //   );
  // };

  // const addToQueue = (payload: IQueue[]) => {
  //   setQueue(payload);
  // };

  const selectQueue = (patient: IQueue | undefined) =>
    setSelectedPatient(patient);

  const saveFilter = (payload: QueueFilterType[] | undefined) => {
    setFilters(payload);
  };

  const toggleOpen = (e: boolean | undefined) => {
    setIsOpen((prev) => (e ? e : !prev));
  };

  return (
    <QueueContext.Provider
      value={{
        isOpen,
        toggleOpen,
        queue,
        saveAllQueue,
        selectedQueue,
        selectQueue,
        filters,
        saveFilter,
        setQueue
        // updateQueueItem,
        // addToQueue
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
