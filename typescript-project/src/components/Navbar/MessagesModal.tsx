import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import { commonStyles } from '../../styles/commonStyles';
import {
  MESSAGES,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../utils/localStorage';
import MessageIcon from '@mui/icons-material/Message';

interface MessagesModalProps {
  isMessagesModalOpen: boolean;
  setIsMessagesModalOpen: (val: boolean) => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  isMessagesModalOpen,
  setIsMessagesModalOpen,
}) => {
  const allMessages: Array<string> = JSON.parse(
    getFromLocalStorage(MESSAGES) || JSON.stringify([])
  );

  const handleOnCloseMessageModal = (): void => {
    setToLocalStorage(MESSAGES, JSON.stringify([]));
    setIsMessagesModalOpen(false);
  };

  return (
    <Modal open={isMessagesModalOpen} onClose={handleOnCloseMessageModal}>
      <Box sx={commonStyles.centeredBox}>
        {allMessages.length ? (
          <DialogContent>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {allMessages.map((value, index) => (
                <ListItem key={value + index} disableGutters>
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        ) : (
          <Typography variant='h6'>There are no messages</Typography>
        )}
        <DialogActions>
          <Button
            onClick={handleOnCloseMessageModal}
            variant='contained'
            color='error'
          >
            Close
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
