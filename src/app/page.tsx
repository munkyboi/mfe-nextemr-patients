'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PatientSearchBox } from '@/components/patient/patient-search-box';
import ProfileScreen from '@/components/patient/patient-info';
import FloatingAlert from '@/components/ui/floating-alert';
import { useEffect, useState } from 'react';
import { IPatient, usePatients } from './context/patients.context';
import { ENDPOINTS } from './api/endpoints';
import { generatePatientId } from '@/lib/utils';

export default function Home() {
  const { selectedPatient, saveAllPatients } = usePatients();
  const [data, setData] = useState<IPatient[]>();
  const [isInQueue, setIsInQueue] = useState(false);
  const handleServeNow = () => {
    setIsInQueue(false);
  };

  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  // const handleSetPatient = (id: string) => {};
  useEffect(() => {
    setTimeout(() => {
      setIsInQueue(true);
    }, 1000);
    (async () => {
      const response = await fetch(ENDPOINTS.GET_ALL_PATIENTS, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        }
      });
      const data = await response.json();
      setData(data);
    })();
  }, [apiKey]);

  useEffect(() => {
    if (data) {
      const tempData = data.map((item) => ({
        ...item,
        id: generatePatientId()
      }));
      saveAllPatients(tempData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <PatientSearchBox />
      </CardHeader>

      {selectedPatient && (
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
              <ProfileScreen />
              <FloatingAlert
                variant="positive"
                open={isInQueue}
                onOpenChange={setIsInQueue}
                actionButton={{
                  label: 'Serve now',
                  onClick: handleServeNow
                }}
                description={
                  <>
                    <span>
                      <span className="font-bold">Tambling, Ben</span> is
                      currently in queue #12
                    </span>
                  </>
                }
              />
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
      )}
    </Card>
  );
}
