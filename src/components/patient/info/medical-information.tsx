import { CollapsibleCard } from '@/components/ui/collapsible-card';
import LabelValue from '@/components/ui/label-value';
import { PATIENTS_FORM_LABELS } from '@/constants/patients.constants';
import { usePatients } from '@/context/patients.context';

export default function PatientMedicalInformation() {
  const { selectedPatient } = usePatients();
  if (!selectedPatient) return null;
  return (
    <CollapsibleCard
      title={PATIENTS_FORM_LABELS.MEDICAL_INFORMATION}
      description={`${PATIENTS_FORM_LABELS.LAST_UPDATED}: April 8, 2025`}
    >
      <div className="space-y-4">
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
  );
}

export { PatientMedicalInformation };
