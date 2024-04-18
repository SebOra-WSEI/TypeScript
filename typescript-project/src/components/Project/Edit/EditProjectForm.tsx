import React from 'react';
import { TextField } from '@mui/material';
import { ProjectFormBody } from '../../../types/project';
import { formStyles } from '../../../styles/formStyles';

interface CreateProjectFormProps {
  project: ProjectFormBody;
  setUpdatedProject: (value: ProjectFormBody) => void;
}

export const EditProjectForm: React.FC<CreateProjectFormProps> = ({
  project,
  setUpdatedProject,
}) => (
  <>
    <h3 style={formStyles.header}>Edit project details</h3>
    <TextField
      label='Name *'
      variant='standard'
      type='text'
      autoComplete='name'
      autoFocus
      value={project?.name}
      fullWidth
      onChange={(evt) =>
        setUpdatedProject({
          ...project,
          name: evt.target.value,
        })
      }
    />
    <TextField
      label='Description *'
      variant='standard'
      type='text'
      autoComplete='description'
      value={project?.description}
      fullWidth
      onChange={(evt) =>
        setUpdatedProject({
          ...project,
          description: evt.target.value,
        })
      }
    />
  </>
);
