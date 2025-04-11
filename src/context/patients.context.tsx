// patients.context.js
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface IPatient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  marital_status: string;
  nationality: string;
  registered_facility: string;
  emergency_contact: string;
  blood_type: string;
  mobile_number: string;
  last_visit: string;
  registered_date: string;
  photo: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  vip: boolean;
}

interface IPatientsContext {
  patients: IPatient[] | undefined;
  saveAllPatients: (payload: IPatient[] | undefined) => void;
  selectedPatient: IPatient | undefined;
  selectPatient: (payload: IPatient | undefined) => void;
}
export const patientsContext_initialData = {
  patients: undefined,
  saveAllPatients: () => {},
  selectedPatient: undefined,
  selectPatient: () => {}
};

// Create the context
const PatientsContext = createContext<IPatientsContext>(
  patientsContext_initialData
);

// Create a provider component
export const PatientsProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<IPatient[]>();
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();

  const saveAllPatients = (payload: IPatient[] | undefined) => {
    console.log(payload);
    setPatients(payload);
  };
  const selectPatient = (patient: IPatient | undefined) =>
    setSelectedPatient(patient);

  return (
    <PatientsContext.Provider
      value={{ patients, saveAllPatients, selectedPatient, selectPatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

// Custom hook for using the PatientsContext
export const usePatients = (): IPatientsContext => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientsProvider');
  }
  return context;
};
