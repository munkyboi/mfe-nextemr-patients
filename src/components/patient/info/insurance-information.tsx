import { CollapsibleCard } from '@/components/ui/collapsible-card';
import LabelValue from '@/components/ui/label-value';
import { PATIENTS_FORM_LABELS } from '@/constants/patients.constants';
import { usePatients } from '@/context/patients.context';

export default function PatientInsuranceInformation() {
  const { selectedPatient } = usePatients();
  if (!selectedPatient) return null;
  return (
    <CollapsibleCard
      title={PATIENTS_FORM_LABELS.INSURANCE_INFORMATION}
      description={`${PATIENTS_FORM_LABELS.LAST_UPDATED}: April 8, 2025`}
    >
      <div className="columns-none md:columns-2 gap-4 space-y-4">
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
  );
}

export { PatientInsuranceInformation };
