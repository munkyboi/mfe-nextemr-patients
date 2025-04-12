import { AtSign, MapPin, Mail, Pen, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PatientPersonalInfo from './info/personal-info';
import { Separator } from '../ui/separator';
import { usePatients } from '@/context/patients.context';
import { getPatientFullName, getPatientRegion } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { PATIENTS_FORM_LABELS } from '@/constants/patients.constants';
import PatientVitalStatistics from './info/vital-stats';
import PatientMedicalInformation from './info/medical-information';
import PatientInsuranceInformation from './info/insurance-information';

export default function ProfileScreen() {
  const { selectedPatient } = usePatients();
  if (!selectedPatient) return null;
  return (
    <div className="fluid mx-auto">
      <div className="flex flex-col sm:flex-row flex-nowrap gap-y-4 sm:gap-4">
        <div className="relative w-full sm:w-[200px] flex flex-col justify-start items-center space-y-4">
          <Avatar className="aspect-square h-[200px] w-[200px] border-4 border-background mb-4">
            <AvatarImage src={selectedPatient.photo} alt="User" />
            <AvatarFallback>BT</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <div className="font-medium text-center">
              <div className="inline-block text-2xl">
                {getPatientFullName(selectedPatient)}
              </div>
              {selectedPatient.vip && (
                <Badge className="ml-2 text-[9px] leading-3 bg-blue-500 inline-block">
                  VIP
                </Badge>
              )}
            </div>
            <div className="text-xs font-normal text-gray-400 text-center">
              {PATIENTS_FORM_LABELS.PATIENT_ID}: {selectedPatient.id}
            </div>
          </div>
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
          <div className="flex flex-col justify-center w-full rounded-md border">
            <div className="flex flex-nowrap flex-row justify-center items-center gap-2 py-1 px-4">
              <Phone className="h-4 w-4" />
              <span className="text-[12px] leading-6">
                {selectedPatient.mobile_number}
              </span>
            </div>
            <Separator />
            <div className="flex flex-nowrap flex-row justify-center items-center gap-2 py-1 px-4">
              <AtSign className="h-4 w-4" />
              <span className="text-[12px] leading-6">
                {selectedPatient.email}
              </span>
            </div>
            <Separator />
            <div className="flex flex-nowrap flex-row justify-center items-center gap-2 py-1 px-4">
              <MapPin className="h-4 w-4" />
              <span className="text-[12px] leading-6">
                {getPatientRegion(selectedPatient)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="gap-4 columns-xs">
            <PatientPersonalInfo />
            <PatientVitalStatistics />
            <PatientMedicalInformation />
            <PatientInsuranceInformation />
          </div>
        </div>
      </div>
    </div>
  );
}
