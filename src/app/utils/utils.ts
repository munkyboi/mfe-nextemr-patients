import { IPatient } from '../context/patients.context';

type IPatientData = IPatient | undefined;

export const getPatientFullName = (data: IPatientData) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  return `${tempData.last_name}, ${tempData.first_name}`;
};

export const getPatientRegion = (data: IPatientData) => {
  if (!data) return null;
  let tempData = data;
  if (Array.isArray(data)) tempData = data[0];
  let result;
  if (tempData.city) result = `${tempData.city}`;
  if (tempData.state) result += `, ${tempData.state}`;
  if (tempData.postal_code) result += ` ${tempData.postal_code}`;
  return result;
};

export const getPatientAddress = (data: IPatientData) => {
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

export const getPatientAge = (data: IPatientData) => {
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

export const isSearchMatched = (patient: IPatientData, searchQuery: string) => {
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
