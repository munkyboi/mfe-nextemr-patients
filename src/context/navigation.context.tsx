import { createContext, useContext, useState } from 'react';

type NavigationContextProviderProps = {
  children: React.ReactNode;
};

type NavigationContextType = {
  currentKey: string;
  setCurrentKey: (e: string) => void;
};

export const NavigationContext = createContext({} as NavigationContextType);

export const NavigationProvider = ({
  children
}: NavigationContextProviderProps) => {
  const [currentKey, setCurrentKey] = useState<string>('home');
  return (
    <NavigationContext.Provider value={{ currentKey, setCurrentKey }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook for using the NavigationContext
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
