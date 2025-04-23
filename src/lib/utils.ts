import { IPatient } from '@/context/patients.context';
import { IPhysician } from '@/context/physicians.context';
import { IQueue, IQueueStatus, QueueFilterType } from '@/context/queue.context';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IValidateStatusBody } from './api/api.constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPatientFullName = (data: IPatient | undefined) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  return `${tempData.last_name}, ${tempData.first_name}`;
};

export const getPhysicianFullName = (data: IPhysician | undefined) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  return `Dr. ${tempData.last_name}, ${tempData.first_name}`;
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
  const prefix = 'NXEMR';

  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  const getRandom = (source: string, count: number) =>
    Array.from({ length: count }, () =>
      source.charAt(Math.floor(Math.random() * source.length))
    );

  const letterPart = getRandom(letters, 3);
  const digitPart = getRandom(digits, 9);

  const mixed = [...letterPart, ...digitPart]
    .sort(() => Math.random() - 0.5) // shuffle
    .join('');

  return `${prefix}-${year}${month}-${mixed}`;
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

const filterStatusMap = {
  'in-progress': 'active',
  queued: 'active',
  notified: 'active',
  billed: 'active',
  cancelled: 'inactive',
  're-scheduled': 'inactive',
  completed: 'inactive',
  paid: 'inactive'
};
export const filterQUeue = (
  queue: IQueue[] | undefined,
  filters: QueueFilterType[] | undefined
) => {
  let result = queue;
  if (queue && filters) {
    result = queue.filter((item) =>
      filters.includes(filterStatusMap[item.status])
    );
  }
  return result;
};

export const generateBatchNumber = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear().toString().substr(-2);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const extra = d.getTime().toString().substr(0, 5);
  return `${year}${month}${day}${extra}`;
};

export const generateTicketNumber = (start = 'AA000') => {
  let current = start.toUpperCase();

  function incrementLetters(letters: string) {
    const chars = letters.split('');
    let i = chars.length - 1;

    while (i >= 0) {
      if (chars[i] !== 'Z') {
        chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
        break;
      } else {
        chars[i] = 'A';
        i--;
      }
    }

    return chars.join('');
  }

  return function getNext() {
    let letters = current.slice(0, 2);
    let number = parseInt(current.slice(2), 10);

    number++;
    if (number > 999) {
      number = 1; // Reset to 001
      letters = incrementLetters(letters);

      if (letters === 'AA') {
        // We’ve wrapped around completely
        console.warn('Wrapped around to AA001');
      }
    }

    current = `${letters}${number.toString().padStart(3, '0')}`;
    return current;
  };
};

export const validateStatus = (
  response: Response,
  body: IValidateStatusBody
) => {
  return (
    (response.status === 200 || response.status === 201) &&
    body.status === 'SUCCESS'
  );
};
