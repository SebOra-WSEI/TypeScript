import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { StorageFormBody } from '../../../../types/storage';

interface CreateStorageFormProps {
  storage: StorageFormBody;
  setStorage: (value: StorageFormBody) => void;
}

export const CreateStorageForm: React.FC<CreateStorageFormProps> = ({
  storage,
  setStorage,
}) => {
  const {
    name,
    description,
    priority
  } = storage;

  return (
    <>
      <h3 style={formStyles.header}>Create new storage</h3>
      <TextField
        label='Name *'
        variant='standard'
        type='text'
        autoComplete='name'
        autoFocus
        value={name}
        fullWidth
        onChange={(evt) =>
          setStorage({
            ...storage,
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
          setStorage({
            ...storage,
            description: evt.target.value,
          })
        }
      />
      <FormControl sx={formStyles.formControl} size="small">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          label="Priority"
          onChange={(evt) =>
            setStorage({
              ...storage,
              priority: evt.target.value as Priority,
            })
          }
        >
          {Object.values(Priority).map((p) => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};