import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItemIcon,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { PRIORITY_ICONS } from '../../../utils/priorityIcons';
import { TaskModel } from '../../../types/task';
import { TaskCardMenu } from './TaskCardMenu';
import { cardStyles } from '../../../styles/cardStyles';
import { EditTaskModal } from '../Form/Edit/EditTaskModal';
import { StoryPointsItem } from './StoryPointsItem';
import { ItemTaskHeader } from '../../common/ItemCardHeader';

interface TaskCardProps {
  task: TaskModel;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<boolean>(false);

  const {
    name,
    description,
    priority,
    createdDate,
    expectedEndTime,
    storyPoint,
  } = task;

  const handleEditTaskOnOpen = (): void => setIsEditTaskModalOpen(true);
  const handleEditTaskOnClose = (): void => setIsEditTaskModalOpen(false);

  return (
    <>
      <Card sx={cardStyles.wrapper}>
        <CardHeader
          title={<ItemTaskHeader text={name} isTitle />}
          subheader={<ItemTaskHeader text={description} />}
          action={
            <TaskCardMenu
              task={task}
              handleEditTaskOnOpen={handleEditTaskOnOpen}
            />
          }
        />
        <CardContent sx={cardStyles.cardContent}>
          <Grid container>
            <Grid item sx={cardStyles.priority} xs={5}>
              <ListItemIcon>
                {PRIORITY_ICONS[priority]}
                <Typography
                  variant='inherit'
                  color='text.secondary'
                  fontSize='small'
                >
                  {priority}
                </Typography>
              </ListItemIcon>
            </Grid>
            <Grid item xs={5}>
              <StoryPointsItem storyPoint={storyPoint} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5} sx={cardStyles.gridText}>
              <Typography variant='inherit' color='text.secondary'>
                Created at: {new Date(createdDate).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={cardStyles.gridText}>
              <Typography variant='inherit' color='text.secondary'>
                Expected end time:{' '}
                {new Date(expectedEndTime).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={handleEditTaskOnClose}
        task={task}
      />
    </>
  );
};
