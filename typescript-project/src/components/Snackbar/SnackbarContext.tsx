import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { SeverityOption } from '../../types/severity';

interface SnackbarContextState {
  severityText: string;
  severity: SeverityOption;
  setSeverityText: (value: string) => void;
  setSeverity: (value: SeverityOption) => void;
}

const defaultServiceFlowState = {
  severityText: '',
  severity: SeverityOption.Error,
  setSeverityText: (_: string) => {},
  setSeverity: (_: SeverityOption) => {},
};

const SnackbarContext = createContext(defaultServiceFlowState);

export const useSnackbarContextProvider = (): SnackbarContextState =>
  useContext(SnackbarContext);

export const SnackbarContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption>(
    SeverityOption.Error
  );

  return (
    <SnackbarContext.Provider
      value={{
        setSeverity,
        setSeverityText,
        severity,
        severityText,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
