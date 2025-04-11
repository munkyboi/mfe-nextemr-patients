import { IQueueItem } from '@/components/queue/queue-widget';
import { IPatient } from '@/context/patients.context';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPatientFullName = (data: IPatient | undefined) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  return `${tempData.last_name}, ${tempData.first_name}`;
};

export const getPatientRegion = (data: IPatient | undefined) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  let result;
  if (tempData.city) result = `${tempData.city}`;
  if (tempData.state) result += `, ${tempData.state}`;
  if (tempData.postal_code) result += ` ${tempData.postal_code}`;
  return result;
};

export const getPatientAddress = (data: IPatient | undefined) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  let result;
  if (tempData.address_1) result = `${tempData.address_1}`;
  if (tempData.address_2) result += `, ${tempData.address_2}`;
  if (tempData.city) result += `, ${tempData.city}`;
  if (tempData.state) result += `, ${tempData.state}`;
  if (tempData.country) result += ` ${tempData.country}`;
  if (tempData.postal_code) result += ` ${tempData.postal_code}`;
  return result;
};

export const getPatientAge = (data: IPatient | undefined) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  const today = new Date();
  const birthDate = new Date(tempData.date_of_birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const isSearchMatched = (
  patient: IPatient | undefined,
  searchQuery: string
) => {
  if (!patient) return false;
  let result =
    searchQuery === '' ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase());

  if (patient.registered_facility)
    result =
      result ||
      patient.registered_facility
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
  if (patient.emergency_contact)
    result =
      result ||
      patient.emergency_contact
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
  if (patient.nationality)
    result =
      result ||
      patient.nationality.toLowerCase().includes(searchQuery.toLowerCase());
  if (patient.mobile_number)
    result =
      result ||
      patient.mobile_number.toLowerCase().includes(searchQuery.toLowerCase());
  if (patient.address_1)
    result =
      result ||
      patient.address_1.toLowerCase().includes(searchQuery.toLowerCase());
  if (patient.address_2)
    result =
      result ||
      patient.address_2.toLowerCase().includes(searchQuery.toLowerCase());
  if (patient.city)
    result =
      result || patient.city.toLowerCase().includes(searchQuery.toLowerCase());
  if (patient.state)
    result =
      result || patient.state.toLowerCase().includes(searchQuery.toLowerCase());
  if (patient.country)
    result =
      result ||
      patient.country.toLowerCase().includes(searchQuery.toLowerCase());

  return result;
};

export const generateSerialCode = (groups = 2, groupLength = 4): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const code = [];

  for (let i = 0; i < groups; i++) {
    let group = '';
    for (let j = 0; j < groupLength; j++) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      group += randomChar;
    }
    code.push(group);
  }

  return code.join('-');
};

export const generatePatientId = (): string => {
  const result = `NXEMR-${generateSerialCode(1, 8)}-${generateSerialCode(1, 4)}`;
  return result;
};

export const generateRandomStatus = () => {
  const status = [
    'in-progress',
    'cancelled',
    'notified',
    're-scheduled',
    'billed',
    'paid',
    'completed',
    'queued'
  ];
  const rand = Math.floor(Math.random() * 8);
  return status[rand] as IQueueStatus;
};

export const generateRandomQueue = (
  arr: IPatient[] | undefined,
  count: number,
  result: IQueueItem[] = []
): IQueueItem[] | undefined => {
  if (arr) {
    if (result.length === count) {
      return result;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = {
      ...arr[randomIndex],
      status: generateRandomStatus()
    };
    if (!result.includes(item)) {
      result.push(item);
    }
    return generateRandomQueue(arr, count, result);
  }
};
