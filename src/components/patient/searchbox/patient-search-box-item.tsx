import { Badge } from '@/components/ui/badge';
import { CommandItem } from '@/components/ui/command';
import { IPatient, usePatients } from '@/context/patients.context';
import { cn, getPatientFullName } from '@/lib/utils';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IPatientSearchBoxItemProps {
  patient: IPatient;
  onClose: (e: boolean) => void;
}

export const PatientSearchBoxItem: FC<IPatientSearchBoxItemProps> = ({
  patient,
  onClose
}) => {
  const router = useRouter();
  const { clearSelectedPatient, selectedPatient } = usePatients();

  const selectedPatientId = selectedPatient?.id;

  const handleSelectPatient = (id: string) => {
    clearSelectedPatient();
    router.push(`/patients/${id}/info`);
  };

  return (
    <CommandItem
      value={patient.id}
      onSelect={(currentValue) => {
        handleSelectPatient(currentValue);
        onClose(false); // close the combo box
      }}
      className={cn('border-b border-gray-200 rounded-none', {
        'bg-gray-200': patient.id === selectedPatientId
      })}
    >
      <User size={16} className="mr-2 h-8 w-8 bg-black/10 rounded-full p-2" />
      <div className="flex flex-col">
        <span>{getPatientFullName(patient)}</span>
        <span className={cn('text-xs text-muted-foreground')}>
          ID: {patient.display_id}
        </span>
      </div>
      {patient.vip === '1' && (
        <Badge variant="info" className="ml-auto">
          VIP
        </Badge>
      )}
    </CommandItem>
  );
};

export default PatientSearchBoxItem;
