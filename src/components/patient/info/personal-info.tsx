import { usePatients } from '@/context/patients.context';
import {
  getPatientAddress,
  getPatientAge,
  getPatientFullName
} from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CollapsibleCard } from '@/components/ui/collapsible-card';
import LabelValue from '@/components/ui/label-value';
import { PATIENTS_FORM_LABELS } from '@/constants/patients.constants';

export default function PatientPersonalInfo() {
  const { selectedPatient } = usePatients();
  if (!selectedPatient) return null;
  return (
    <Card className="flex-1 mb-4 break-inside-avoid-column">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <div>
            <CardTitle className="text-2xl flex items-center">
              {getPatientFullName(selectedPatient)}{' '}
              {selectedPatient.vip && (
                <Badge className="ml-2 text-[10px] bg-blue-500">VIP</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {PATIENTS_FORM_LABELS.PATIENT_ID}: {selectedPatient.id}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="columns-none md:columns-2 gap-4 space-y-4">
          <LabelValue
            label={PATIENTS_FORM_LABELS.DATE_OF_BIRTH}
            value={`${selectedPatient.date_of_birth} (${getPatientAge(selectedPatient)} yrs. old)`}
          />
          <LabelValue label="Gender" value={selectedPatient.gender} />
          <LabelValue
            label={PATIENTS_FORM_LABELS.MARITAL_STATUS}
            value={selectedPatient.marital_status}
          />
          <LabelValue
            label={PATIENTS_FORM_LABELS.NATIONALITY}
            value={selectedPatient.nationality}
          />
          <LabelValue
            label={PATIENTS_FORM_LABELS.ADDRESS}
            value={getPatientAddress(selectedPatient)}
          />
          <LabelValue label="Emergency contact" value="Vouhgtae, Marlon" />
          <LabelValue
            label={PATIENTS_FORM_LABELS.BLOOD_TYPE}
            value={selectedPatient.blood_type}
          />
          <LabelValue label="Primary physician" value="Dr. Sarah Johnson" />
          <LabelValue
            label={PATIENTS_FORM_LABELS.REGISTERED_FACILITY}
            value={selectedPatient.registered_facility}
          />
          <LabelValue
            label={PATIENTS_FORM_LABELS.MEMBER_SINCE}
            value={new Date(
              selectedPatient.registered_date
            ).toLocaleDateString()}
          />
          <LabelValue
            label={PATIENTS_FORM_LABELS.LAST_VISIT}
            value={
              <>
                {new Date(selectedPatient.last_visit).toLocaleDateString()}{' '}
                <span className="text-gray-400">
                  (
                  {new Date(selectedPatient.last_visit).toLocaleString('en', {
                    weekday: 'long',
                    timeZone: 'UTC'
                  })}
                  )
                </span>
              </>
            }
          />
          <LabelValue
            label={PATIENTS_FORM_LABELS.REFERRED_BY}
            value="Kogmo, Lingin"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { PatientPersonalInfo };
