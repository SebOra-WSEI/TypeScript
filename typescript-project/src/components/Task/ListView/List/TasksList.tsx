import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { State } from '../../../../types/state';
import { storyStyle } from '../../../../styles/storyStyle';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { TaskModel } from '../../../../types/task';
import { TaskCard } from '../../Card/TaskCard';
import { StatesListItem } from '../../../common/StatesList/StatesListItem';

interface TasksListProps {
  tasks: Array<TaskModel> | undefined;
  handleCreateTaskOnOpen: () => void;
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  handleCreateTaskOnOpen,
}) => {
  if (!tasks?.length) {
    return (
      <Box sx={projectPageStyles.wrapper}>
        <p>There are no tasks yet</p>
        <Button onClick={handleCreateTaskOnOpen}>Create new task</Button>
      </Box>
    );
  }

  return (
    <Box display='grid' sx={storyStyle.box}>
      <Grid container>
        {Object.values(State).map((state) => {
          const filteredTasks = tasks?.filter((task) => task.state === state);

          return (
            <Grid item xs={4} key={state}>
              <StatesListItem text={state} />
              {filteredTasks?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
