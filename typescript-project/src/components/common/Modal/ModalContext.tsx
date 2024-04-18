import { Box, Button, DialogActions, DialogContent, Modal } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { formStyles } from "../../../styles/formStyles";

type ModalType = 'create' | 'update'

interface ModalContentProps extends PropsWithChildren {
  isOpen: boolean;
  handleOnClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  type: ModalType
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  isOpen,
  handleOnClose,
  onSubmit,
  type
}) => {

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={formStyles.box} component='form' onSubmit={onSubmit}>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOnClose}
            variant='contained'
            color='error'
            style={formStyles.button}
          >
            Close
          </Button>
          <Button variant='outlined' type='submit' style={formStyles.button}>
            {type[0].toUpperCase() + type.slice(1)}
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  )
}