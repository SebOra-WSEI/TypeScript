import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProjectFormBody } from '../../../../types/project';
import { useCreateProject } from '../../../../api/project/useCreateProject';
import { SeverityOption } from '../../../../types/severity';
import { projectFormStyles } from '../../../../styles/projectFormStyles';
import { CreateProjectForm } from '../Form/CreateProjectForm';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSeverity: (value: SeverityOption) => void;
  setSeverityText: (value: string) => void;
}

export const CreateProjectFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  setSeverity,
  setSeverityText
}) => {
  const [project, setProject] = useState<ProjectFormBody>({
    name: '',
    description: '',
  });
  const { error, message, create } = useCreateProject(project);

  useEffect(() => {
    if (error) {
      setSeverity(SeverityOption.Error);
      setSeverityText(error);
    }

    if (message) {
      setSeverity(SeverityOption.Success);
      setSeverityText(message);
    }
  }, [error, message]);

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
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={projectFormStyles.box} component='form' onSubmit={handleCreate}>
        <DialogContent>
          <CreateProjectForm project={project} setProject={setProject} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOnClose}
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
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
