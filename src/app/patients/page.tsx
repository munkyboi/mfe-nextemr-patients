'use client';

import { PatientSearchBox } from '@/components/patient/searchbox/patient-search-box';
import { useGetPatientsQuery } from '@/lib/api/patients.api';
import { usePatients } from '@/context/patients.context';

export default function PatientsHome() {
  const { saveAllPatients, clearSelectedPatient } = usePatients();
  const { data: patientsData, isLoading, isSuccess } = useGetPatientsQuery();

  clearSelectedPatient();

  if (isLoading) return 'Loading...';

  if (isSuccess) {
    saveAllPatients(patientsData.data);
  }

  return <PatientSearchBox />;
}
