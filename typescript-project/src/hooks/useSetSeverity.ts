import { useEffect } from 'react';
import { useAppContextProvider } from '../AppContext';
import { SeverityOption } from '../types/severity';

export const useSetSeverity = (
  error: string | undefined,
  message: string | undefined
) => {
  const { setSeverity, setSeverityText } = useAppContextProvider();

  useEffect(() => {
    if (error) {
      setSeverity(SeverityOption.Error);
      setSeverityText(error);
    }

    if (message) {
      setSeverity(SeverityOption.Success);
      setSeverityText(message);
    }
  }, [error, message]);
};
