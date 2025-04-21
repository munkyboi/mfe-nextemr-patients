import { TabsContent } from '@/components/ui/tabs';
import { TABS_LIST } from '@/constants/patients.constants';

interface IPatientsTabContentProps {
  id: string;
}

export function PatientsTabContent({ id }: IPatientsTabContentProps) {
  return (
    <>
      {TABS_LIST.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.render(id)}
        </TabsContent>
      ))}
    </>
  );
}
