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
import { storyStyle } from '../../../styles/storyStyle';
import { StoryModel } from '../../../types/story';
import { priorityIcons } from '../../../utils/priorityIcons';
import { TaskModel } from '../../../types/task';

interface TaskCardProps {
  task: TaskModel;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isEditStoryModalOpen, setIsEditStoryModalOpen] =
    useState<boolean>(false);

  const { name, description, priority, createdDate, endDate, storyPoint } = task;

  const handleEditStoryOnOpen = (): void => setIsEditStoryModalOpen(true);
  const handleEditStoryOnClose = (): void => setIsEditStoryModalOpen(false);

  return (
    <>
      <Card sx={{ ...storyStyle.card, height: '10rem' }}>
        <CardHeader
          title={<Header text={name} isTitle />}
          subheader={<Header text={description ?? ''} />}
        />
        <CardContent sx={storyStyle.cardContent}>
          <Grid container>
            <Grid item sx={storyStyle.priority} xs={5}>
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
            <Grid item xs={5} sx={storyStyle.gridText}>
              <Typography variant='inherit' color='text.secondary'>
                Story Points: {storyPoint}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5} sx={storyStyle.gridText}>
              <Typography variant='inherit' color='text.secondary'>
                Created at: {new Date(createdDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={storyStyle.gridText}>
              <Typography variant='inherit' color='text.secondary'>
                Expected end data: {new Date(endDate).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <EditStoryModal
        isOpen={isEditStoryModalOpen}
        onClose={handleEditStoryOnClose}
        story={story}
      /> */}
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
