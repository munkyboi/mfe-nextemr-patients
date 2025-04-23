// queue.context.js
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type IMedicalFields =
  | 'General Practitioner'
  | 'Family Medicine'
  | 'Internal Medicine'
  | 'Pediatrics'
  | 'Geriatrics'
  | 'Cardiology'
  | 'Endocrinology'
  | 'Gastroenterology'
  | 'Nephrology'
  | 'Pulmonology'
  | 'Neurology'
  | 'Dermatology'
  | 'Rheumatology'
  | 'Hematology'
  | 'Oncology'
  | 'Infectious Disease'
  | 'Allergy & Immunology'
  | 'General Surgery'
  | 'Orthopedic Surgery'
  | 'Neurosurgery'
  | 'Cardiothoracic Surgery'
  | 'Plastic & Reconstructive Surgery'
  | 'Otolaryngology (ENT)'
  | 'Urology'
  | 'Ophthalmology'
  | 'Obstetrics & Gynecology (OB/GYN)'
  | 'Pediatric Cardiology'
  | 'Pediatric Neurology'
  | 'Pediatric Oncology'
  | 'Psychiatry'
  | 'Anesthesiology'
  | 'Radiology'
  | 'Pathology'
  | 'Emergency Medicine'
  | 'Sports Medicine'
  | 'Occupational Medicine'
  | 'Preventive Medicine'
  | 'Public Health & Epidemiology';

export interface IPhysician {
  id: string;
  first_name: string;
  last_name: string;
  medical_field: IMedicalFields;
  created_date: string;
  last_updated: string;
}

interface IPhysiciansContext {
  physicians: IPhysician[] | undefined;
  saveAllPhysicians: (e: IPhysician[] | undefined) => void;
}

// Create the context
const PhysiciansContext = createContext({} as IPhysiciansContext);

// Create a provider component
export const PhysiciansProvider = ({ children }: { children: ReactNode }) => {
  const [physicians, setPhysicians] = useState<IPhysician[] | undefined>();

  const saveAllPhysicians = (payload: IPhysician[] | undefined) => {
    setPhysicians(payload);
  };

  return (
    <PhysiciansContext.Provider
      value={{
        physicians,
        saveAllPhysicians
      }}
    >
      {children}
    </PhysiciansContext.Provider>
  );
};

// Custom hook for using the PhysiciansContext
export const usePhysicians = (): IPhysiciansContext => {
  const context = useContext(PhysiciansContext);
  if (!context) {
    throw new Error('usePhysicians must be used within a PhysiciansProvider');
  }
  return context;
};
