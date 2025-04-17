'use client';

import { use } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PatientSearchBox } from '@/components/patient/searchbox/patient-search-box';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ProfileInfo from '@/components/patient/patient-info';
import { PatientQueueAlert } from '@/components/patient/alerts/patient-queue-alert';

type PatientInfoProps = {
  params: Promise<{
    id: string;
  }>;
};
export default function PatientInfo({ params }: PatientInfoProps) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  if (!id) return null;

  return (
    <>
      <Card className="gap-4">
        <PatientSearchBox />
        <CardContent>
          <Tabs defaultValue="tab-1">
            <TabsList>
              <ScrollArea className="w-full">
                <div className="flex flex-nowrap items-center justify-start">
                  <TabsTrigger value="tab-1">Info</TabsTrigger>
                  <TabsTrigger value="tab-2">Labs</TabsTrigger>
                  <TabsTrigger value="tab-3">Tests</TabsTrigger>
                  <TabsTrigger value="tab-4">Vitals</TabsTrigger>
                  <TabsTrigger value="tab-5">Meds</TabsTrigger>
                  <TabsTrigger value="tab-6">Vaccine</TabsTrigger>
                  <TabsTrigger value="tab-7">Notes</TabsTrigger>
                  <TabsTrigger value="tab-8">Histories</TabsTrigger>
                  <TabsTrigger value="tab-9">Images</TabsTrigger>
                  <TabsTrigger value="tab-10">To-do</TabsTrigger>
                  <TabsTrigger value="tab-11">Requests</TabsTrigger>
                  <TabsTrigger value="tab-12">Forms</TabsTrigger>
                  <TabsTrigger value="tab-13">Sketch</TabsTrigger>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsList>
            <TabsContent value="tab-1">
              <ProfileInfo id={id} />
            </TabsContent>
            <TabsContent value="tab-2">
              <p className="p-4 text-center text-xs text-muted-foreground">
                Content for Tab 2
              </p>
            </TabsContent>
            <TabsContent value="tab-3">
              <p className="p-4 text-center text-xs text-muted-foreground">
                Content for Tab 3
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <PatientQueueAlert />
    </>
  );
}
