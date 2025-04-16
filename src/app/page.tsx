'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { PatientSearchBox } from '@/components/patient/patient-search-box';
import { useEffect, useState } from 'react';
import { IPatient, usePatients } from '../context/patients.context';
import { ENDPOINTS } from '@/data-manager/endpoints';
// import { IQueue, useQueue } from '@/context/queue.context';
import { getCommonHeaders } from '@/data-manager/helpers';

export default function Home() {
  const { saveAllPatients } = usePatients();
  // const { addToQueue } = useQueue();
  const [patientData, setPatientData] = useState<IPatient[]>();
  // const [queueData, setQueueData] = useState<IQueue[]>();

  useEffect(() => {
    (async () => {
      const patients_response = await fetch(ENDPOINTS.GET_ALL_PATIENTS, {
        method: 'GET',
        headers: getCommonHeaders()
      });
      const { data } = await patients_response.json();
      setPatientData(data);
      // const queue_response = await fetch(ENDPOINTS.GET_ALL_QUEUE, {
      //   method: 'GET',
      //   headers: getCommonHeaders()
      // });
      // const queue_json = await queue_response.json();
      // setQueueData(queue_json);
    })();
  }, []);

  useEffect(() => {
    if (patientData) {
      saveAllPatients(patientData);
    }
    // if (queueData) {
    //   addToQueue(queueData);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientData]);

  return (
    <Card>
      <CardHeader>
        <PatientSearchBox />
      </CardHeader>
    </Card>
  );
}
