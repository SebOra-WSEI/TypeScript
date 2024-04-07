import { Alert, AlertColor, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SeverityOption } from '../../types/severity';
import { snackbarStyles } from '../../styles/snackbar';

interface SnackbarAlertProps {
  setSeverity: (isOpen: SeverityOption | undefined) => void;
  text: string;
  severity?: AlertColor;
}

export const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  setSeverity,
  text,
  severity,
}) => {
  return (
    <Snackbar
      open={!!severity}
      autoHideDuration={2500}
      onClose={() => setSeverity(undefined)}
    >
      <Alert
        severity={severity}
        style={snackbarStyles}
        action={
          <IconButton
            color='inherit'
            size='small'
            onClick={() => {
              setSeverity(undefined);
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
