import {
  ArrowDownToLine,
  ArrowUpToLine,
  Ban,
  Banknote,
  BanknoteArrowUp,
  CalendarPlus,
  Check,
  EllipsisVertical,
  HandCoins,
  UserPen,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { FC } from 'react';
import { getPatientFullName, cn } from '@/lib/utils';
import { IQueueItem } from './queue-widget';
import QueueNotificationToggle from './queue-notification-toggle';

interface IQueueItemProps {
  ticket: string;
  patient: IQueueItem;
}

type IBadgeVariant =
  | 'info'
  | 'positive'
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'warning'
  | 'cancelled'
  | null
  | undefined;

export const QueueItem: FC<IQueueItemProps> = ({ ticket, patient }) => {
  const status = patient.status || 'N/A';
  let variant: IBadgeVariant;
  if (patient.status === 'in-progress' || patient.status === 'notified')
    variant = 'positive';
  if (patient.status === 'completed') variant = 'default';
  if (patient.status === 'queued' || patient.status === 'paid')
    variant = 'info';
  if (patient.status === 'cancelled' || patient.status === 're-scheduled')
    variant = 'cancelled';
  if (patient.status === 'billed') variant = 'warning';

  return (
    <div
      className={cn(
        'relative flex items-center justify-between px-4 py-2 border-b hover:bg-gray-50',
        {
          'bg-green-100': patient.status === 'in-progress',
          'text-gray-400': variant === 'cancelled',
          'border-b-gray-200': variant === 'cancelled'
        }
      )}
    >
      <div className="w-full flex items-center gap-4">
        <div className="w-16 flex flex-col gap-2 items-center">
          <div className="text-md font-bold">{ticket}</div>
        </div>
        <div className="w-full overflow-hidden">
          <h4 className="truncate">{getPatientFullName(patient)}</h4>
          <p
            className={cn('text-xs text-muted-foreground truncate', {
              'text-gray-300': variant === 'cancelled'
            })}
          >
            Dr. Sarah Johnson
          </p>
        </div>
        <Badge variant={variant}>{status.toUpperCase()}</Badge>
        <QueueNotificationToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[220px]">
            <DropdownMenuLabel>
              <div className="flex flex-col items-start gap-2 overflow-hidden">
                <div className="text-lg font-semibold w-full truncate">{`${ticket} ${getPatientFullName(patient)}`}</div>
                <Badge variant={variant}>{status.toUpperCase()}</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {status === 'in-progress' ? (
              <DropdownMenuItem>
                <Check />
                Done serving
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem disabled={variant === 'cancelled'}>
                <Check />
                Serve now
              </DropdownMenuItem>
            )}
            <DropdownMenuItem disabled={variant === 'cancelled'}>
              <Ban />
              Cancel queue
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Banknote />
              Payment
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={variant === 'cancelled'}>
              <ArrowUpToLine />
              Move up
            </DropdownMenuItem>
            <DropdownMenuItem disabled={variant === 'cancelled'}>
              <ArrowDownToLine />
              Move down
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HandCoins />
              Add charge
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BanknoteArrowUp />
              Add adjustment
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserPen />
              Edit patient
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users />
              Replace patient
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CalendarPlus />
              Move to appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default QueueItem;
