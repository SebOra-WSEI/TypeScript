import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { formStyles } from '../../../styles/formStyles';
import { TaskFormBody } from '../../../types/task';
import { expectedWorkingDays } from '../../../utils/expectedWorkingDays';
import { CreateTaskPriorityInput } from './InputFields/CreateTaskPriorityInput';
import { CreateTaskStoryPointsInput } from './InputFields/CreateTaskStoryPointsInput';

interface CreateTaskFormProps {
  task: TaskFormBody;
  setTask: (value: TaskFormBody) => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  task,
  setTask,
}) => {
  const [expectedDays, setExpectedDays] = useState<number>(0);

  const { name, description } = task;

  return (
    <>
      <h3 style={formStyles.header}>Create new task</h3>
      <TextField
        label='Name *'
        variant='standard'
        type='text'
        autoComplete='name'
        autoFocus
        value={name}
        fullWidth
        onChange={(evt) =>
          setTask({
            ...task,
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
          setTask({
            ...task,
            description: evt.target.value,
          })
        }
      />
      <div style={styles.controlWrapper}>
        <CreateTaskPriorityInput
          task={task}
          setTask={setTask}
        />
        <CreateTaskStoryPointsInput
          task={task}
          setTask={setTask}
        />
      </div>
      <TextField
        label='Expected days'
        type='number'
        size='small'
        value={expectedDays}
        sx={styles.expectedDays}
        onChange={(evt) => {
          setExpectedDays(parseInt(evt.target.value));

          setTask({
            ...task,
            expectedEndTime: expectedWorkingDays(parseInt(evt.target.value)),
          });
        }}
      />
    </>
  );
};

const styles = {
  controlWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  expectedDays: {
    marginTop: '1.4rem',
    width: '8rem',
  },
};