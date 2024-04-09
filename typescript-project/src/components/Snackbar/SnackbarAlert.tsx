import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { snackbarStyles } from '../../styles/snackbarStyles';
import { useSnackbarContextProvider } from './SnackbarContext';

export const SnackbarAlert: React.FC = () => {
  const { severity, severityText, setSeverityText } =
    useSnackbarContextProvider();

  return (
    <Snackbar
      open={!!severityText}
      autoHideDuration={2500}
      onClose={() => setSeverityText('')}
    >
      <Alert
        severity={severity}
        style={snackbarStyles}
        action={
          <IconButton
            color='inherit'
            size='small'
            onClick={() => {
              setSeverityText('');
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
      >
        {severityText}
      </Alert>
    </Snackbar>
  );
};
