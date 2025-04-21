'use client';

import { Card, CardContent } from '@/components/ui/card';
import { usePatients } from '../context/patients.context';

export default function Home() {
  const { clearSelectedPatient } = usePatients();

  clearSelectedPatient();

  return (
    <Card className="gap-4">
      <CardContent>
        <div>Home...</div>
      </CardContent>
    </Card>
  );
}
