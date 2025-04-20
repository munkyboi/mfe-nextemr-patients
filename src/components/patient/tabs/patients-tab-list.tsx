import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetPatientByIdQuery } from '@/lib/api/patients.api';
import { PatientsTabListSkeleton } from './patients-tab-list.skeleton';

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
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="labs">Labs</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="meds">Meds</TabsTrigger>
          <TabsTrigger value="vaccine">Vaccine</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="histories">Histories</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="todo">To-do</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="sketch">Sketch</TabsTrigger>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </TabsList>
  );
}
