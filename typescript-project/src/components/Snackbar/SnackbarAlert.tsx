import React from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useSnackbarContextProvider } from './SnackbarContext';
import { SNACKBAR_DURATION } from '../../utils/consts';
import CloseIcon from '@mui/icons-material/Close';

export const SnackbarAlert: React.FC = () => {
  const { severity, severityText, setSeverityText } =
    useSnackbarContextProvider();

  const handleAlertClose = (): void => setSeverityText('');

  return (
    <Snackbar
      open={!!severityText}
      autoHideDuration={SNACKBAR_DURATION}
      onClose={handleAlertClose}
    >
      <Alert
        severity={severity}
        style={styles}
        action={
          <IconButton color='inherit' size='small' onClick={handleAlertClose}>
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
      >
        {severityText}
      </Alert>
    </Snackbar>
  );
};

const styles = {
  borderRadius: '1.3rem',
};
