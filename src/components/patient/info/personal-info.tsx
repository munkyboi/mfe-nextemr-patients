import { usePatients } from '@/app/context/patients.context';
import {
  getPatientAddress,
  getPatientAge,
  getPatientFullName
} from '@/app/utils/utils';
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
                  Patient ID: {selectedPatient.id}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="columns-none md:columns-2 gap-4">
              <LabelValue
                label="Date of birth"
                value={`${selectedPatient.date_of_birth} (${getPatientAge(selectedPatient)} yrs. old)`}
              />
              <LabelValue label="Gender" value={selectedPatient.gender} />
              <LabelValue
                label="Marital status"
                value={selectedPatient.marital_status}
              />
              <LabelValue
                label="Nationality"
                value={selectedPatient.nationality}
              />
              <LabelValue
                label="Address"
                value={getPatientAddress(selectedPatient)}
              />
              <LabelValue label="Emergency contact" value="Vouhgtae, Marlon" />
              <LabelValue
                label="Blood type"
                value={selectedPatient.blood_type}
              />
              <LabelValue label="Primary physician" value="Dr. Sarah Johnson" />
              <LabelValue
                label="Registered facility"
                value={selectedPatient.registered_facility}
              />
              <LabelValue
                label="Member since"
                value={selectedPatient.registered_date}
              />
              <LabelValue
                label="Last visit"
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
              <LabelValue label="Referred by" value="Kogmo, Lingin" />
            </div>
          </CardContent>
        </Card>
        <CollapsibleCard
          title="Vital statistics"
          description="Last updated: April 8, 2025"
        >
          <div className="columns-none md:columns-2 gap-4">
            <LabelValue label="Height" value="5'11&quot; (180 cm)" />
            <LabelValue label="Weight" value="175 lbs (79.4 kg)" />
            <LabelValue label="BMI" value="24.4 (Normal)" />
            <LabelValue label="Blood Pressure" value="120/80 mmHg" />
          </div>
        </CollapsibleCard>
        <CollapsibleCard
          title="Medical information"
          description="Last updated: April 8, 2025"
        >
          <div className="">
            <LabelValue
              label="Problems"
              value="Sadipscing dolore tempor consetetur dolor magna erat labore nonumy at, dolor ea sed ipsum sed at. Kasd lorem consetetur rebum."
            />
            <LabelValue
              label="Diagnosis"
              value="Left was of ah shell could to him soils soon. And gild had or for, friends wight spoiled but lines."
            />
            <LabelValue
              label="Allergies"
              value="Mit lied sonst ihr lied sich, mild die die dem gleich jenem. Guten verschwand die fühl tage , was sie manche lebt ernsten umwittert der schwebet folgenden, was besitze euch fühlt ihr die in, ich wie sich schöne euch die.."
            />
            <LabelValue
              label="Notes"
              value="Opened i raven let and token he flown tufted wished. The all i gileadtell and beak in. Yore shadow door weak of with turning it. Only there with tapping yore door at. For flown ebony grew bore nevernevermore decorum. My raven upon he bust. When this as oh floor then, the into maiden merely god grim dreams my entrance. Token."
            />
          </div>
        </CollapsibleCard>
        <CollapsibleCard
          title="Insurance information"
          description="Last updated: April 8, 2025"
        >
          <div className="columns-none md:columns-2 gap-4">
            <LabelValue label="Insurance plan" value="Intellicare" />
            <LabelValue label="Insurance Id no." value="2211-1245-5502-0203" />
            <LabelValue label="Group no." value="2212314-22" />
            <LabelValue label="Co-Pay" value="P550" />
            <LabelValue
              label="Address"
              value="Ambot Lang Asa Ni, Street Boy, Cebu City, PH 6000"
            />
            <LabelValue label="Hotline" value="1-800-2455412" />
            <LabelValue label="Guarantor" value="Sam Ting Wong" />
            <LabelValue label="Guarantor's DOB" value="01 Jan 1991" />
            <LabelValue label="Relations to guarantor" value="NA" />
            <LabelValue
              label="Note"
              value="Balibari ni kay sigeg pang-utang! - Bob"
            />
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

export { PatientPersonalInfo };
