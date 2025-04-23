import { PropsWithChildren } from 'react';
import { PatientsProvider } from './patients.context';
import { QueueProvider } from './queue.context';
import { PhysiciansProvider } from './physicians.context';

export function ContextProvider({ children }: PropsWithChildren) {
  return (
    <PatientsProvider>
      <QueueProvider>
        <PhysiciansProvider>{children}</PhysiciansProvider>
      </QueueProvider>
    </PatientsProvider>
  );
}
