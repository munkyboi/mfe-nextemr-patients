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
import { Badge } from '../ui/badge';
import { usePatients } from '@/app/context/patients.context';

export default function PatientSearchActions() {
  const { selectedPatient } = usePatients();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-tl-none rounded-bl-none text-white bg-blue-500 hover:bg-blue-600 min-w-auto md:min-w-[200px]"
          disabled={!selectedPatient}
        >
          Action
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Walk-in Patient</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Add to queue
            <DropdownMenuShortcut>
              <Badge variant="secondary" className="text-[10px]">
                #8
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
