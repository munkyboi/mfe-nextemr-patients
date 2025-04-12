import { usePatients } from '@/context/patients.context';
import { CollapsibleCard } from '@/components/ui/collapsible-card';
import LabelValue from '@/components/ui/label-value';
import { PATIENTS_FORM_LABELS } from '@/constants/patients.constants';

export default function PatientVitalStatistics() {
  const { selectedPatient } = usePatients();
  if (!selectedPatient) return null;
  return (
    <CollapsibleCard
      title={PATIENTS_FORM_LABELS.VITAL_STATISTICS}
      description={`${PATIENTS_FORM_LABELS.LAST_UPDATED}: April 8, 2025`}
    >
      <div className="columns-none md:columns-2 gap-4 space-y-4">
        <LabelValue
          label={PATIENTS_FORM_LABELS.HEIGHT}
          value="5'11&quot; (180 cm)"
        />
        <LabelValue
          label={PATIENTS_FORM_LABELS.WEIGHT}
          value="175 lbs (79.4 kg)"
        />
        <LabelValue label={PATIENTS_FORM_LABELS.BMI} value="24.4 (Normal)" />
        <LabelValue
          label={PATIENTS_FORM_LABELS.BLOOD_PRESSURE}
          value="120/80 mmHg"
        />
      </div>
    </CollapsibleCard>
  );
}

export { PatientVitalStatistics };
