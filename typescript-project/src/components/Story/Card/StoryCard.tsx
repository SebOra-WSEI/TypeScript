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
import { StoryCardMenu } from './StoryCardMenu';
import { StoryModel } from '../../../types/story';
import { EditStoryModal } from '../Edit/Modal/EditStoryModal';
import { priorityIcons } from '../../../utils/priorityIcons';
import { cardStyles } from '../../../styles/card';

interface StoryCardProps {
  story: StoryModel;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [isEditStoryModalOpen, setIsEditStoryModalOpen] =
    useState<boolean>(false);

  const { name, description, priority, date, owner } = story;

  const handleEditStoryOnOpen = (): void => setIsEditStoryModalOpen(true);
  const handleEditStoryOnClose = (): void => setIsEditStoryModalOpen(false);

  return (
    <>
      <Card sx={cardStyles.wrapper}>
        <CardHeader
          title={<Header text={name} isTitle />}
          subheader={<Header text={description ?? ''} />}
          action={
            <StoryCardMenu
              story={story}
              handleEditStoryOnOpen={handleEditStoryOnOpen}
            />
          }
        />
        <CardContent sx={cardStyles.cardContent}>
          <Grid container>
            <Grid item sx={cardStyles.priority}>
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
          </Grid>
          <Grid container>
            <Grid item xs={5} sx={cardStyles.gridText}>
              <Typography variant='inherit' color='text.secondary'>
                Created at: {new Date(date).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={storyStyle.icon}>
              <Avatar sx={storyStyle.avatar}>
                <Typography fontSize='small'>
                  {owner?.name?.[0]}
                  {owner?.surname?.[0]}
                </Typography>
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <EditStoryModal
        isOpen={isEditStoryModalOpen}
        onClose={handleEditStoryOnClose}
        story={story}
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
