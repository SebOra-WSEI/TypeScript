import React from 'react';
import { TextField, Typography } from '@mui/material';
import { ProjectBasic } from '../../../types/project';
import { formStyles } from '../../../styles/formStyles';

interface CreateProjectFormProps {
  project: ProjectBasic;
  setProject: (value: ProjectBasic) => void;
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  project,
  setProject,
}) => {
  const { name, description } = project;

  return (
    <>
      <Typography color='secondary' sx={formStyles.centeredHeader}>Create new project</Typography>
      <TextField
        label='Name *'
        variant='standard'
        type='text'
        autoComplete='name'
        autoFocus
        value={name}
        fullWidth
        onChange={(evt) =>
          setProject({
            ...project,
            name: evt.target.value,
          })
        }
      />
      <TextField
        label='Description'
        variant='standard'
        type='text'
        autoComplete='description'
        value={description}
        fullWidth
        onChange={(evt) =>
          setProject({
            ...project,
            description: evt.target.value,
          })
        }
      />
    </>
  );
};
