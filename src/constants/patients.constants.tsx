import ProfileInfo from '@/components/patient/patient-info';

export const PATIENTS_FORM_LABELS = {
  PATIENT_ID: 'Patient ID',
  DATE_OF_BIRTH: 'Date of birth',
  GENDER: 'Gender',
  MARITAL_STATUS: 'Marital status',
  NATIONALITY: 'Nationality',
  ADDRESS: 'Address',
  EMERGENCY_CONTACT: 'Emergency contact',
  BLOOD_TYPE: 'Blood type',
  PRIMARY_PHYSICIAN: 'Primary physician',
  REGISTERED_FACILITY: 'Registered facility',
  MEMBER_SINCE: 'Member since',
  LAST_VISIT: 'Last visit',
  REFERRED_BY: 'Referred by',
  VITAL_STATISTICS: 'Vital Statistics',
  LAST_UPDATED: 'Last updated',
  HEIGHT: 'Height',
  BMI: 'BMI',
  WEIGHT: 'Weight',
  BLOOD_PRESSURE: 'Blood pressure',
  MEDICAL_INFORMATION: 'Medical information',
  PROBLEMS: 'Problems',
  DIAGNOSIS: 'Diagnosis',
  ALLERGIES: 'Allergies',
  NOTES: 'Notes',
  INSURANCE_INFORMATION: 'Insurance information',
  INSURANCE_PLAN: 'Insurance plan',
  INSURANCE_ID_NUMBER: 'Insurance ID no.',
  GROUP_NUMBER: 'Group no.',
  CO_PAY: 'Co-pay',
  HOTLINE: 'Hotline',
  GUARANTOR_NAME: 'Guarantor name',
  GUARANTORS_DATE_OF_BIRTH: "Guaranto's DOB",
  RELATIONS_TO_GUARANTOR: 'Relations to guarantor',
  NOTE: 'Note'
};

// export const TABS_LIST = {
//   INFO: 'info',
//   LABS: 'labs',
//   TESTS: 'tests',
//   VITALS: 'vitals',
//   MEDS: 'meds',
//   NOTES: 'notes',
//   HISTORIES: 'histories',
//   IMAGES: 'images',
//   TODO: 'to-do',
//   REQUESTS: 'requests',
//   FORMS: 'forms',
//   SKETCH: 'sketch'
// };

export const TABS_LIST = [
  {
    id: 'info',
    label: 'Info',
    render: (id: string) => <ProfileInfo id={id} />
  },
  {
    id: 'labs',
    label: 'Labs',
    render: () => <div>Laboratories content</div>
  },
  {
    id: 'tests',
    label: 'Tests',
    render: () => <div>Tests content</div>
  },
  {
    id: 'vitals',
    label: 'Vital Statistics',
    render: () => <div>Vital Statistics content</div>
  }
];
