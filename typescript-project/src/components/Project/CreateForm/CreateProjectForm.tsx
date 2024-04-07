import React from 'react';
import { TextField } from '@mui/material';
import { ProjectFormBody } from '../../../types/project';

interface CreateProjectFormProps {
  project: ProjectFormBody;
  setProject: (value: ProjectFormBody) => void;
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  project,
  setProject,
}) => {
  const { name, description } = project;

  return (
    <>
      <h3>Create new project</h3>
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
