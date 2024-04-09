import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { ProjectFormBody, ProjectModel } from '../../../../types/project';
import { formStyles } from '../../../../styles/formStyles';
import { EditProjectForm } from '../Form/EditProjectForm';
import { useEditProjectById } from '../../../../api/project/useEditProjectById';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModel;
}

export const EditProjectFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [updatedProject, setUpdatedProject] =
    useState<ProjectFormBody>(project);

  const { update } = useEditProjectById(updatedProject);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    update && update(project?.id ?? '');
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleUpdate}>
        <DialogContent>
          <EditProjectForm
            project={updatedProject}
            setUpdatedProject={setUpdatedProject}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            variant='contained'
            color='error'
            style={formStyles.button}
          >
            Close
          </Button>
          <Button variant='outlined' type='submit' style={formStyles.button}>
            Update
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
