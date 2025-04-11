import { AtSign, MapPin, Mail, Pen, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PatientPersonalInfo from './info/personal-info';
import { Separator } from '../ui/separator';
import { usePatients } from '@/context/patients.context';
import { getPatientRegion } from '@/lib/utils';

export default function ProfileScreen() {
  const { selectedPatient } = usePatients();
  if (!selectedPatient) return null;
  return (
    <div className="fluid mx-auto">
      <div className="flex flex-col sm:flex-row flex-nowrap gap-y-4 sm:gap-4">
        <div className="relative w-full sm:w-[200px] flex flex-col justify-start items-center space-y-1">
          <Avatar className="aspect-square h-[200px] w-[200px] border-4 border-background mb-4">
            <AvatarImage src={selectedPatient.photo} alt="User" />
            <AvatarFallback>BT</AvatarFallback>
          </Avatar>
          <div className="flex flex-nowrap items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm text-[12px]"
            >
              <Mail className="h-2 w-2 mr-2" />
              Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm text-[12px]"
            >
              <Pen className="h-2 w-2 mr-2" />
              Edit
            </Button>
          </div>
          <div className="flex flex-col justify-center w-full rounded-md border mt-4">
            <div className="flex flex-nowrap flex-row justify-center items-center gap-2 p-2">
              <Phone className="h-4 w-4" />
              <span className="text-[12px] leading-6">
                {selectedPatient.mobile_number}
              </span>
            </div>
            <Separator />
            <div className="flex flex-nowrap flex-row justify-center items-center gap-2 p-2">
              <AtSign className="h-4 w-4" />
              <span className="text-[12px] leading-6">
                {selectedPatient.email}
              </span>
            </div>
            <Separator />
            <div className="flex flex-nowrap flex-row justify-center items-center gap-2 p-2">
              <MapPin className="h-4 w-4" />
              <span className="text-[12px] leading-6">
                {getPatientRegion(selectedPatient)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <PatientPersonalInfo />
        </div>
      </div>
    </div>
  );
}
