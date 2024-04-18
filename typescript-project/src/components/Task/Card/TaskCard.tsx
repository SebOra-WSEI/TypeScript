import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItemIcon,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { priorityIcons } from '../../../utils/priorityIcons';
import { TaskModel } from '../../../types/task';
import { TaskCardMenu } from './TaskCardMenu';
import { deepPurple } from '@mui/material/colors';
import { cardStyles } from '../../../styles/card';
import { EditTaskModal } from '../Edit/Modal/EditTaskModal';

interface TaskCardProps {
  task: TaskModel;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<boolean>(false);

  const { name, description, priority, createdDate, endDate, storyPoint } =
    task;

  const handleEditTaskOnOpen = (): void => setIsEditTaskModalOpen(true);
  const handleEditTaskOnClose = (): void => setIsEditTaskModalOpen(false);

  return (
    <>
      <Card sx={cardStyles.wrapper}>
        <CardHeader
          title={<Header text={name} isTitle />}
          subheader={<Header text={description} />}
          action={<TaskCardMenu task={task} handleEditTaskOnOpen={handleEditTaskOnOpen} />}
        />
        <CardContent sx={cardStyles.cardContent}>
          <Grid container>
            <Grid item sx={cardStyles.priority} xs={5}>
              <ListItemIcon>
                {priorityIcons[priority]}
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
              <StoryPoints storyPoint={storyPoint} />
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
                Expected end time: {new Date(endDate).toLocaleDateString()}
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

const Header: React.FC<{ text: string; isTitle?: boolean }> = ({
  text,
  isTitle = false,
}) => (
  <span style={{ fontSize: 'small' }}>
    {isTitle ? <strong>{text}</strong> : <>{text}</>}
  </span>
);

const StoryPoints: React.FC<{ storyPoint: number }> = ({ storyPoint }) => (
  <>
    <span style={{ color: '#757575' }}>Story Points:</span>
    <div style={{ display: 'inline-block', marginLeft: '0.3rem' }}>
      <Avatar sx={{ width: 15, height: 15, bgcolor: deepPurple[500], }}>
        <span style={{ fontSize: 10 }}>{storyPoint}</span>
      </Avatar>
    </div>
  </>
);