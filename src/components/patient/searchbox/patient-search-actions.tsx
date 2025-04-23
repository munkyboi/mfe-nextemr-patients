import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CalendarPlusIcon } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { usePatients } from '@/context/patients.context';
import { useAddToQueueMutation } from '@/lib/api/queue.api';
import { useGetPatientsQuery } from '@/lib/api/patients.api';
import { useQueue } from '@/context/queue.context';

export default function PatientSearchActions() {
  const { selectedPatient } = usePatients();
  const { queue, addToQueue } = useQueue();
  const { isLoading: getPatientsIsLoading } = useGetPatientsQuery();
  const [
    submit,
    { data: addToQueueData, isLoading: addToQueueIsLoading, isSuccess }
  ] = useAddToQueueMutation();

  const isLoading = getPatientsIsLoading || addToQueueIsLoading;
  const isDisabled = !queue || !selectedPatient;

  const handleAddToQueue = () => {
    const body = {
      physician_id: selectedPatient?.physician_id,
      patient_id: selectedPatient?.id,
      note: ''
    };
    submit(body);
  };

  if (addToQueueIsLoading) console.log('sending...');
  if (isSuccess) {
    console.log('🚀 ~ addToQueueData:', addToQueueData);
    addToQueue(addToQueueData.data.batchQueue);
  }
  const currentQueueLength = (queue ? queue.length : 0) + 1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading || isDisabled}>
        <Button
          variant="secondary"
          className="rounded-tl-none rounded-bl-none text-white bg-blue-500 hover:bg-blue-600 min-w-auto md:min-w-[200px]"
          disabled={isLoading || isDisabled}
        >
          Action
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Walk-in Patient</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleAddToQueue}>
            Add to queue
            <DropdownMenuShortcut>
              <Badge variant="secondary" className="text-[10px]">
                #{currentQueueLength}
              </Badge>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Set Appointment</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Today
            <DropdownMenuShortcut>
              <Badge variant="secondary" className="text-[10px]">
                4
              </Badge>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Tomorrow
            <DropdownMenuShortcut>
              <Badge variant="secondary" className="text-[10px]">
                7
              </Badge>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Select Date
            <DropdownMenuShortcut>
              <CalendarPlusIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { PatientSearchActions };
