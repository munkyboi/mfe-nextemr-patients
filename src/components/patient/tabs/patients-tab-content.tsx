import { TabsContent } from '@/components/ui/tabs';
import { useGetPatientByIdQuery } from '@/lib/api/patients.api';
import { usePatients } from '@/context/patients.context';
import { TABS_LIST } from '@/constants/patients.constants';

interface IPatientsTabContentProps {
  id: string;
}

export function PatientsTabContent({ id }: IPatientsTabContentProps) {
  const { selectPatient } = usePatients();
  const { data, isSuccess } = useGetPatientByIdQuery(id);

  if (isSuccess) selectPatient(data.data);
  return (
    <>
      {TABS_LIST.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.render()}
        </TabsContent>
      ))}
    </>
  );
}
