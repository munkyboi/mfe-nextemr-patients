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
import {
  IAddToQueueResponse,
  useAddToQueueMutation
} from '@/lib/api/queue.api';
import { useGetPatientsQuery } from '@/lib/api/patients.api';
import { IQueue, useQueue } from '@/context/queue.context';
import { useState } from 'react';
import { IResponse } from '@/lib/api/api.types';

export default function PatientSearchActions() {
  const { selectedPatient } = usePatients();
  const { queue, saveAllQueue } = useQueue();
  const [addToQueueFetching, setAddToQueueFetching] = useState(false);
  const { isLoading: getPatientsIsLoading } = useGetPatientsQuery();
  const [addToQueue] = useAddToQueueMutation();

  const isLoading = getPatientsIsLoading || addToQueueFetching;
  const isDisabled = !queue || !selectedPatient;

  const handleAddToQueue = async () => {
    setAddToQueueFetching(true);
    const body = {
      physician_id: selectedPatient?.physician_id,
      patient_id: selectedPatient?.id,
      note: ''
    };
    try {
      const addToQueueResult = await addToQueue(body).unwrap();
      console.log('🚀 ~ addToQueueResult:', addToQueueResult);
      saveAllQueue(addToQueueResult?.data?.batchQueue);
    } catch (error) {
      console.log('🚀 ~ handleAddToQueue ~ error:', error);
    }
    setAddToQueueFetching(false);
  };

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
