import { PropsWithChildren } from 'react';
import { PatientsProvider } from './patients.context';
import { QueueProvider } from './queue.context';
import { PhysiciansProvider } from './physicians.context';
import { ReferenceProvider } from './reference.context';

export function ContextProvider({ children }: PropsWithChildren) {
  return (
    <ReferenceProvider>
      <PhysiciansProvider>
        <PatientsProvider>
          <QueueProvider>{children}</QueueProvider>
        </PatientsProvider>
      </PhysiciansProvider>
    </ReferenceProvider>
  );
}
