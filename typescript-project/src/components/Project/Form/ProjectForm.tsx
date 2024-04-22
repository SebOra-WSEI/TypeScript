import React from 'react';
import { TextField } from '@mui/material';
import { ProjectBasic } from '../../../types/project';
import { commonStyles } from '../../../styles/commonStyles';

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
      <h3 style={commonStyles.header}>Create new project</h3>
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
