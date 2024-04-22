import React, { PropsWithChildren } from 'react';
import { Box, Button, DialogActions, DialogContent, Modal, } from '@mui/material';
import { boxStyles } from '../../styles/boxStyles';
import { commonStyles } from '../../styles/commonStyles';

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
    <Box sx={boxStyles} component='form' onSubmit={onSubmit}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={handleOnClose}
          variant='contained'
          color='error'
          style={commonStyles.buttonBorderRadius}
        >
          Close
        </Button>
        <Button variant='outlined' type='submit' style={commonStyles.buttonBorderRadius}>
          {type[0].toUpperCase() + type.slice(1)}
        </Button>
      </DialogActions>
    </Box>
  </Modal>
);