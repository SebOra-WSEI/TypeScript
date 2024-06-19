import React, { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { TaskBasic } from '../../../../types/task';
import { expectedWorkingDays } from '../../../../utils/expectedWorkingDays';
import { PriorityInput } from '../../../common/InputFields/PriorityInput';
import { StoryPointsInput } from '../../../common/InputFields/StoryPointsInput';
import { formStyles } from '../../../../styles/formStyles';
import { useParams } from 'react-router';

interface CreateTaskFormProps {
  task: TaskBasic;
  setTask: (value: TaskBasic) => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  task,
  setTask,
}) => {
  const [expectedDays, setExpectedDays] = useState<number>(0);
  const { storyId } = useParams<{ storyId: string }>();

  const { name, description } = task;

  useEffect(() => {
    setTask({ ...task, storyId });
  }, []);

  return (
    <>
      <Typography color='secondary' sx={formStyles.centeredHeader}>
        Create new task
      </Typography>
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
        <PriorityInput item={task} setItem={setTask} isLabelEnabled />
        <StoryPointsInput task={task} setTask={setTask} isLabelEnabled />
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
            expectedEndTime: String(
              expectedWorkingDays(parseInt(evt.target.value)).getTime()
            ),
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
    width: '9em',
  },
};
