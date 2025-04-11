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
    <div>
      <div className="gap-4 columns-xs">
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
            <div className="columns-none md:columns-2 gap-4">
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
                      {new Date(selectedPatient.last_visit).toLocaleString(
                        'en',
                        {
                          weekday: 'long',
                          timeZone: 'UTC'
                        }
                      )}
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
        <CollapsibleCard
          title={PATIENTS_FORM_LABELS.VITAL_STATISTICS}
          description={`${PATIENTS_FORM_LABELS.LAST_UPDATED}: April 8, 2025`}
        >
          <div className="columns-none md:columns-2 gap-4">
            <LabelValue
              label={PATIENTS_FORM_LABELS.HEIGHT}
              value="5'11&quot; (180 cm)"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.WEIGHT}
              value="175 lbs (79.4 kg)"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.BMI}
              value="24.4 (Normal)"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.BLOOD_PRESSURE}
              value="120/80 mmHg"
            />
          </div>
        </CollapsibleCard>
        <CollapsibleCard
          title={PATIENTS_FORM_LABELS.MEDICAL_INFORMATION}
          description={`${PATIENTS_FORM_LABELS.LAST_UPDATED}: April 8, 2025`}
        >
          <div className="">
            <LabelValue
              label={PATIENTS_FORM_LABELS.PROBLEMS}
              value="Sadipscing dolore tempor consetetur dolor magna erat labore nonumy at, dolor ea sed ipsum sed at. Kasd lorem consetetur rebum."
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.DIAGNOSIS}
              value="Left was of ah shell could to him soils soon. And gild had or for, friends wight spoiled but lines."
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.ALLERGIES}
              value="Mit lied sonst ihr lied sich, mild die die dem gleich jenem. Guten verschwand die fühl tage , was sie manche lebt ernsten umwittert der schwebet folgenden, was besitze euch fühlt ihr die in, ich wie sich schöne euch die.."
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.NOTES}
              value="Opened i raven let and token he flown tufted wished. The all i gileadtell and beak in. Yore shadow door weak of with turning it. Only there with tapping yore door at. For flown ebony grew bore nevernevermore decorum. My raven upon he bust. When this as oh floor then, the into maiden merely god grim dreams my entrance. Token."
            />
          </div>
        </CollapsibleCard>
        <CollapsibleCard
          title={PATIENTS_FORM_LABELS.INSURANCE_INFORMATION}
          description={`${PATIENTS_FORM_LABELS.LAST_UPDATED}: April 8, 2025`}
        >
          <div className="columns-none md:columns-2 gap-4">
            <LabelValue
              label={PATIENTS_FORM_LABELS.INSURANCE_PLAN}
              value="Intellicare"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.INSURANCE_ID_NUMBER}
              value="2211-1245-5502-0203"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.GROUP_NUMBER}
              value="2212314-22"
            />
            <LabelValue label={PATIENTS_FORM_LABELS.CO_PAY} value="P550" />
            <LabelValue
              label={PATIENTS_FORM_LABELS.ADDRESS}
              value="Ambot Lang Asa Ni, Street Boy, Cebu City, PH 6000"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.HOTLINE}
              value="1-800-2455412"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.GUARANTOR_NAME}
              value="Sam Ting Wong"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.GUARANTORS_DATE_OF_BIRTH}
              value="01 Jan 1991"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.RELATIONS_TO_GUARANTOR}
              value="NA"
            />
            <LabelValue
              label={PATIENTS_FORM_LABELS.NOTE}
              value="Balibari ni kay sigeg pang-utang! - Bob"
            />
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

export { PatientPersonalInfo };
