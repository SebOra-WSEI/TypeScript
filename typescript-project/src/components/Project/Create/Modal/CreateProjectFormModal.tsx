import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { ProjectFormBody } from '../../../../types/project';
import { useCreateProject } from '../../../../api/project/useCreateProject';
import { formStyles } from '../../../../styles/formStyles';
import { CreateProjectForm } from '../Form/CreateProjectForm';

interface CreateProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectFormModal: React.FC<CreateProjectFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [project, setProject] = useState<ProjectFormBody>({
    name: '',
    description: '',
  });

  const { create } = useCreateProject(project);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    create();
  };

  const handleOnClose = (): void => {
    setProject({ name: '', description: '' });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleCreate}>
        <DialogContent>
          <CreateProjectForm project={project} setProject={setProject} />
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
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
