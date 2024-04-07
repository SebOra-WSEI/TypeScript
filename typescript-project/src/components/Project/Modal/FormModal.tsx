import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formModalStyles } from '../../../styles/formModal';
import { CreateProjectForm } from '../CreateForm/CreateProjectForm';
import { ProjectFormBody } from '../../../types/project';
import { useCreateProject } from '../../../api/project/useCreateProject';
import { SnackbarAlert } from '../../common/SnackbarAlert';
import { SeverityOption } from '../../../types/severity';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [severityText, setSeverityText] = useState<string>('');
  const [project, setProject] = useState<ProjectFormBody>({
    name: '',
    description: '',
  });
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );

  const { error, message, create } = useCreateProject(project);

  useEffect(() => {
    if (!severityText && error) {
      setSeverityText(error);
    }

    if (!!error && !!severityText) {
      setSeverity(SeverityOption.Error);
    }
  }, [error, severityText]);

  useEffect(() => {
    if (!severityText && message) {
      setSeverityText(message);
    }

    if (!!message && !!message) {
      setSeverity(SeverityOption.Success);
    }
  }, [message, severityText]);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    create();
    setSeverityText('');
  };

  const handleOnClose = (): void => {
    setProject({ name: '', description: '' });
    onClose();
  };

  return (
    <>
      <Modal open={isOpen} onClose={handleOnClose}>
        <Box sx={formModalStyles.box} component='form' onSubmit={handleCreate}>
          <DialogContent>
            <CreateProjectForm project={project} setProject={setProject} />
          </DialogContent>
          <DialogActions>
            <div style={formModalStyles.action}></div>
            <Button
              onClick={handleOnClose}
              variant='contained'
              color='error'
              style={formModalStyles.button}
            >
              Close
            </Button>
            <Button
              variant='outlined'
              type='submit'
              style={formModalStyles.button}
            >
              Create
            </Button>
          </DialogActions>
        </Box>
      </Modal>
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
    </>
  );
};
