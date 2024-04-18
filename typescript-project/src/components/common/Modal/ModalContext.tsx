import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { modalStyles } from '../../../styles/modalStyles';

type ModalType = 'create' | 'update';

interface ModalContentProps extends PropsWithChildren {
  isOpen: boolean;
  handleOnClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  type: ModalType;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  isOpen,
  handleOnClose,
  onSubmit,
  type,
}) => (
  <Modal open={isOpen} onClose={handleOnClose}>
    <Box sx={styles.box} component='form' onSubmit={onSubmit}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={handleOnClose}
          variant='contained'
          color='error'
          style={modalStyles.button}
        >
          Close
        </Button>
        <Button variant='outlined' type='submit' style={modalStyles.button}>
          {type[0].toUpperCase() + type.slice(1)}
        </Button>
      </DialogActions>
    </Box>
  </Modal>
);

const styles = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    padding: '2rem',
    borderRadius: '1.5rem',
  },
}