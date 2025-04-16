'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { PatientSearchBox } from '@/components/patient/patient-search-box';
import { usePatients } from '../context/patients.context';
import { useGetPatientsQuery } from '@/lib/api/patients.api';

export default function Home() {
  const { saveAllPatients } = usePatients();

  const { data, isSuccess } = useGetPatientsQuery();

  if (isSuccess) saveAllPatients(data.data);

  return (
    <Card>
      <CardHeader>
        <PatientSearchBox />
      </CardHeader>
    </Card>
  );
}
