'use client';

import { Card } from '@/components/ui/card';
import { PatientSearchBox } from '@/components/patient/searchbox/patient-search-box';
import { useGetPatientsQuery } from '@/lib/api/patients.api';
import { usePatients } from '@/context/patients.context';

export default function PatientsHome() {
  const { saveAllPatients, selectPatient } = usePatients();
  const { data: patientsData, isLoading, isSuccess } = useGetPatientsQuery();

  if (isLoading) return 'Loading...';

  if (isSuccess) {
    selectPatient(undefined);
    saveAllPatients(patientsData.data);
  }

  return (
    <Card className="gap-4">
      <PatientSearchBox />
    </Card>
  );
}
