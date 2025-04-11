'use client';

import { cn, getPatientFullName, isSearchMatched } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Check, ChevronDown, User } from 'lucide-react';
import { useCallback, useState } from 'react';
import PatientSearchActions from './patient-search-actions';
import { IPatient, usePatients } from '@/app/context/patients.context';
import { useDebounce } from '@/hooks/use-debounce';

function PatientSearchBox() {
  const LIST_LIMIT = 50;
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const {
    patients: patientsData,
    selectedPatient: selectedPatientData,
    selectPatient
  } = usePatients();

  const handleSearchQuery = (query: string) => {
    setSearch(query);
    if (query.length >= 4 || query === '') setSearchQuery(query);
  };

  const handleSelectPatient = useCallback(
    (id: string) => {
      setSelectedPatient(id);
      if (patientsData) {
        const patient: IPatient | undefined = patientsData.find(
          (n: IPatient) => n.id === id
        );
        selectPatient(patient);
      }
    },
    [patientsData, selectPatient]
  );

  if (!patientsData) return null;

  console.log('----------------- patientsData', patientsData);
  console.log('----------------- selectedPatient', selectedPatient);
  console.log('----------------- selectedPatientData', selectedPatientData);

  return (
    <div className="space-y-2 min-w-[300px] flex flex-nowrap flex-row">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex-grow justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20 rounded-tr-none rounded-br-none m-0"
          >
            {selectedPatient
              ? getPatientFullName(
                  patientsData.find((patient) => patient.id === selectedPatient)
                )
              : 'Search patients...'}
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
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search by name, ID, or condition..."
              value={search}
              onValueChange={handleSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No patient found.</CommandEmpty>
              <CommandGroup>
                {patientsData
                  .filter((patient) => isSearchMatched(patient, debouncedQuery))
                  .slice(0, LIST_LIMIT) // Limit to 50 results for better performance
                  .map((patient) => (
                    <CommandItem
                      key={patient.id}
                      value={patient.id}
                      onSelect={(currentValue) => {
                        console.log(
                          'ccccccccccccccccc currentValue',
                          currentValue
                        );
                        handleSelectPatient(
                          currentValue === selectedPatient ? '' : currentValue
                        );
                        setOpen(false);
                      }}
                      className={cn({
                        'bg-blue-500': patient.id === selectedPatient,
                        'text-white': patient.id === selectedPatient
                      })}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{getPatientFullName(patient)}</span>
                        <span
                          className={cn('text-xs text-muted-foreground', {
                            'text-white/70': patient.id === selectedPatient
                          })}
                        >
                          ID: {patient.id}
                        </span>
                      </div>
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedPatient === patient.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                {patientsData.filter((patient) =>
                  isSearchMatched(patient, debouncedQuery)
                ).length > LIST_LIMIT && (
                  <div className="py-2 px-2 text-xs text-muted-foreground text-center">
                    Showing {LIST_LIMIT} of{' '}
                    {
                      patientsData.filter((patient) =>
                        isSearchMatched(patient, debouncedQuery)
                      ).length
                    }{' '}
                    results. Refine your search for more specific results.
                  </div>
                )}
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
