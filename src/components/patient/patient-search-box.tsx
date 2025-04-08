'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import PatientSearchActions from './patient-search-actions';

const patientsData = [
  {
    value: 'Tambling, Ben',
    label: 'Tambling, Ben',
  },
  {
    value: 'Wong, Sam Ting',
    label: 'Wong, Sam Ting',
  },
  {
    value: 'Tout, Phalau',
    label: 'Tout, Phalau',
  },
  {
    value: 'Kogmo, Ken',
    label: 'Kogmo, Ken',
  },
  {
    value: 'Yupay, Manu',
    label: 'Yupay, Manu',
  },
  {
    value: 'Fukiko, Ma. Antot',
    label: 'Fukiko, Ma. Antot',
  },
  {
    value: 'Harus, Kononeh',
    label: 'Harus, Kononeh',
  },
  {
    value: 'Morgan, Botbot',
    label: 'Morgan, Botbot',
  },
  {
    value: 'Vuto, Katul',
    label: 'Vuto, Katul',
  },
  {
    value: 'Luvey, Libre',
    label: 'Luvey, Libre',
  },
  {
    value: 'Proton, Bolgas',
    label: 'Proton, Bolgas',
  },
  {
    value: 'Kundun, Kuto',
    label: 'Kundun, Kuto',
  },
];

function PatientSearchBox() {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <div className="space-y-2 min-w-[300px] flex flex-nowrap flex-row">
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex-grow justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20 rounded-tr-none rounded-br-none m-0"
          >
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value
                ? patientsData.find((patient) => patient.value === value)?.label
                : 'Select patient'}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="end"
        >
          <Command>
            <CommandInput placeholder="Search patient..." />
            <CommandList>
              <CommandEmpty>No patient found.</CommandEmpty>
              <CommandGroup>
                {patientsData.map((patient) => (
                  <CommandItem
                    key={patient.value}
                    value={patient.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {patient.label}
                    {value === patient.value && (
                      <Check
                        size={16}
                        strokeWidth={2}
                        className="ml-auto"
                      />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <PatientSearchActions />
    </div>
  );
}

export { PatientSearchBox };
