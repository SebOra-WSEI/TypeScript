import { useEffect } from 'react';
import { useSnackbarContextProvider } from '../components/Snackbar/SnackbarContext';
import { SeverityOption } from '../types/severity';

export const useSetSeverity = (
  error: string | undefined,
  message: string | undefined
) => {
  const { setSeverity, setSeverityText } = useSnackbarContextProvider();

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
