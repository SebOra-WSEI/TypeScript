import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { SeverityOption } from './types/severity';
import { PaletteMode } from '@mui/material';

interface AppContextState {
  severityText: string;
  severity: SeverityOption;
  mode: PaletteMode;
  setSeverityText: (value: string) => void;
  setSeverity: (value: SeverityOption) => void;
  setMode: (value: PaletteMode) => void
}

const defaultAppState = {
  severityText: '',
  mode: 'light' as PaletteMode,
  severity: SeverityOption.Error,
  setSeverityText: (_: string) => { },
  setSeverity: (_: SeverityOption) => { },
  setMode: (_: PaletteMode) => { },
};

const AppContext = createContext(defaultAppState);

export const useAppContextProvider = (): AppContextState =>
  useContext(AppContext);

export const AppContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption>(
    SeverityOption.Error
  );
  const [mode, setMode] = useState<PaletteMode>('light');

  return (
    <AppContext.Provider
      value={{
        setSeverity,
        setSeverityText,
        setMode,
        severity,
        severityText,
        mode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
