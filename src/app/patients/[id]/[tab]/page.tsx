'use client';

import { use } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PatientSearchBox } from '@/components/patient/searchbox/patient-search-box';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ProfileInfo from '@/components/patient/patient-info';
import { PatientQueueAlert } from '@/components/patient/alerts/patient-queue-alert';
import { PatientsTabList } from '@/components/patient/tabs/patients-tab-list';
import { useRouter } from 'next/navigation';
import { PatientsTabContent } from '@/components/patient/tabs/patients-tab-content';

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

  const handleTabChange = (value: string) => {
    router.push(`/patients/${id}/${value}`);
  };

  console.log(tab);

  if (!id || !tab) return null;

  return (
    <>
      <Card className="gap-4">
        <PatientSearchBox id={id} />
        <CardContent>
          <Tabs defaultValue="info" value={tab} onValueChange={handleTabChange}>
            <PatientsTabList id={id} />
            <PatientsTabContent id={id} />
          </Tabs>
        </CardContent>
      </Card>
      <PatientQueueAlert />
    </>
  );
}
