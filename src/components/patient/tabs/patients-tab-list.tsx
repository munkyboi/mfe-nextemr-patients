import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetPatientByIdQuery } from '@/lib/api/patients.api';
import { PatientsTabListSkeleton } from './patients-tab-list.skeleton';
import { TABS_LIST } from '@/constants/patients.constants';

interface IPatientsTabListProps {
  id: string;
}
export function PatientsTabList({ id }: IPatientsTabListProps) {
  const { isLoading } = useGetPatientByIdQuery(id);
  if (isLoading) return <PatientsTabListSkeleton />;
  return (
    <TabsList>
      <ScrollArea className="w-full">
        <div className="flex flex-nowrap items-center justify-start">
          {TABS_LIST.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="px-4">
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </TabsList>
  );
}
