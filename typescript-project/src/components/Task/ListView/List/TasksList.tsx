import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { State } from '../../../../types/state';
import { TaskModel } from '../../../../types/task';
import { TaskCard } from '../../Card/TaskCard';
import { StatesListItem } from '../../../common/StatesListItem';
import { listStyles } from '../../../../styles/listStyles';

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
      <Box sx={listStyles.noItemsWrapper}>
        <p>There are no tasks yet</p>
        <Button onClick={handleCreateTaskOnOpen}>Create new task</Button>
      </Box>
    );
  }

  return (
    <Box display='grid' sx={listStyles.listItemsWrapper}>
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
