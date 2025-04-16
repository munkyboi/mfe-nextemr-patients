'use client';

import { getPatientFullName, isSearchMatched } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import PatientSearchActions from './patient-search-actions';
import { usePatients } from '@/context/patients.context';
import { useDebounce } from '@/hooks/use-debounce';
import PatientSearchBoxItem from './patient-search-box-item';
import { ENDPOINTS } from '@/lib/endpoints';
import { getCommonHeaders } from '@/lib/helpers';

function PatientSearchBox() {
  const LIST_LIMIT = 50;
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { patients, selectedPatient, saveAllPatients } = usePatients();

  const handleSearchQuery = (query: string) => {
    setSearch(query);
    if (query.length >= 4 || query === '') setSearchQuery(query);
  };

  useEffect(() => {
    (async () => {
      const patients_response = await fetch(`${ENDPOINTS.GET_ALL_PATIENTS}`, {
        method: 'GET',
        headers: getCommonHeaders()
      });
      const { data: patientInfoData } = await patients_response.json();
      saveAllPatients(patientInfoData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!patients) return null;

  const searchCount = patients.filter((patient) =>
    isSearchMatched(patient, debouncedQuery)
  ).length;

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
              ? getPatientFullName(selectedPatient)
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
          className="max-w-[100dvw] w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
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
                {patients
                  .filter((patient) => isSearchMatched(patient, debouncedQuery))
                  .slice(0, LIST_LIMIT) // Limit to 50 results for better performance
                  .map((patient) => (
                    <PatientSearchBoxItem
                      key={patient.id}
                      patient={patient}
                      onClose={setOpen}
                    />
                  ))}
                {patients.filter((patient) =>
                  isSearchMatched(patient, debouncedQuery)
                ).length > LIST_LIMIT && (
                  <div className="max-w-full py-2 px-2 text-xs text-muted-foreground text-center break-all">
                    Showing {LIST_LIMIT} of {searchCount} results. Refine your
                    search for more specific results.
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
