'use client';

import { use, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PatientSearchBox } from '@/components/patient/searchbox/patient-search-box';
import { Tabs } from '@/components/ui/tabs';
import { PatientQueueAlert } from '@/components/patient/alerts/patient-queue-alert';
import { PatientsTabList } from '@/components/patient/tabs/patients-tab-list';
import { useRouter } from 'next/navigation';
import { PatientsTabContent } from '@/components/patient/tabs/patients-tab-content';
import { usePatients } from '@/context/patients.context';
import { useLazyGetPatientByIdQuery } from '@/lib/api/patients.api';
import { TABS_LIST } from '@/constants/patients.constants';

type PatientInfoProps = {
  params: Promise<{
    id: string;
    tab: string;
  }>;
};
export default function PatientInfo({ params }: PatientInfoProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id, tab } = unwrappedParams;
  const { selectPatient, clearSelectedPatient } = usePatients();
  const [triggerQuery, { data, isSuccess }] = useLazyGetPatientByIdQuery();

  clearSelectedPatient();

  useEffect(() => {
    if (id) triggerQuery(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isSuccess) {
    const { data: selectedPatientData } = data;
    selectPatient(selectedPatientData);
  }

  const handleTabChange = (value: string) => {
    router.push(`/patients/${id}/${value}`);
  };

  return (
    <>
      <Card className="gap-4">
        <PatientSearchBox id={id} />
        <CardContent>
          <Tabs
            defaultValue={TABS_LIST[0].id}
            value={tab}
            onValueChange={handleTabChange}
          >
            <PatientsTabList id={id} />
            <PatientsTabContent id={id} />
          </Tabs>
        </CardContent>
      </Card>
      <PatientQueueAlert />
    </>
  );
}
