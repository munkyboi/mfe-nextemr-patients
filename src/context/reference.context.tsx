// patients.context.js
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface IReferenceData {
  id: string;
  type: string;
  label: string;
  value: string;
  status: string;
  date_created: string;
  last_updated: string;
}

interface IReferenceContext {
  referenceData: IReferenceData[] | undefined;
  saveAllReferenceData: (data: IReferenceData[] | undefined) => void;
  getReferenceDataByType: (type: string) => IReferenceData[] | undefined;
}

// Create the context
const ReferenceContext = createContext({} as IReferenceContext);

// Create a provider component
export const ReferenceProvider = ({ children }: { children: ReactNode }) => {
  const [referenceData, setReferenceData] = useState<IReferenceData[]>();

  const saveAllReferenceData = (payload: IReferenceData[] | undefined) => {
    setReferenceData(payload);
  };

  const getReferenceDataByType = (type: string) => {
    const result = referenceData?.filter((item) => item.type === type);
    return result;
  };

  return (
    <ReferenceContext.Provider
      value={{
        referenceData,
        saveAllReferenceData,
        getReferenceDataByType
      }}
    >
      {children}
    </ReferenceContext.Provider>
  );
};

// Custom hook for using the ReferenceContext
export const useReferenceData = (): IReferenceContext => {
  const context = useContext(ReferenceContext);
  if (!context) {
    throw new Error('useReferenceData must be used within a ReferenceProvider');
  }
  return context;
};
