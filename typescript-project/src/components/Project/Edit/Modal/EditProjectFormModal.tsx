import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProjectFormBody, ProjectModel } from '../../../../types/project';
import { SnackbarAlert } from '../../../common/SnackbarAlert';
import { SeverityOption } from '../../../../types/severity';
import { projectFormStyles } from '../../../../styles/projectFormStyles';
import { EditProjectForm } from '../Form/EditProjectForm';
import { useEditProjectById } from '../../../../api/project/useEditProjectById';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModel
}

export const EditProjectFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );
  const [updatedProject, setUpdatedProject] = useState<ProjectFormBody>(project);

  const { error, message, update } = useEditProjectById(updatedProject)

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

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    update && update(project?.id ?? '');
    setSeverityText('');
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={projectFormStyles.box} component='form' onSubmit={handleUpdate}>
          <DialogContent>
            <EditProjectForm project={updatedProject} setUpdatedProject={setUpdatedProject} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onClose}
              variant='contained'
              color='error'
              style={projectFormStyles.button}
            >
              Close
            </Button>
            <Button
              variant='outlined'
              type='submit'
              style={projectFormStyles.button}
            >
              Update
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
