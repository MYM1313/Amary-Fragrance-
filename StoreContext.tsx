import React, { createContext, useContext, ReactNode } from 'react';
import { useStore } from './store';

const StoreContext = createContext<ReturnType<typeof useStore> | null>(null);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useStore();
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useGlobalStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalStore must be used within a StoreProvider');
  }
  return context;
};
