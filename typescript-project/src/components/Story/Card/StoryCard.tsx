import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { StoryCardMenu } from './StoryCardMenu';
import { StoryModel } from '../../../types/story';
import { cardStyles } from '../../../styles/cardStyles';
import { PriorityItem } from './CardItems/PriorityItem';
import { CreatedByItem } from './CardItems/CreatedByItem';
import { ItemTaskHeader } from '../../common/ItemCardHeader';
import { EditStoryModal } from '../Form/Edit/EditStoryModal';
import { commonStyles } from '../../../styles/commonStyles';
import { useGetUserById } from '../../../queries/user/useGetUserById';

interface StoryCardProps {
  story: StoryModel;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [isEditStoryModalOpen, setIsEditStoryModalOpen] =
    useState<boolean>(false);

  const { name, description, priority, createdDate, userId } = story;

  const { data: user } = useGetUserById(userId);

  const handleEditStoryOnOpen = (): void => setIsEditStoryModalOpen(true);
  const handleEditStoryOnClose = (): void => setIsEditStoryModalOpen(false);

  return (
    <>
      <Card sx={cardStyles.wrapper}>
        <CardHeader
          title={<ItemTaskHeader text={name} isTitle />}
          subheader={<ItemTaskHeader text={description ?? ''} />}
          action={
            <StoryCardMenu
              story={story}
              handleEditStoryOnOpen={handleEditStoryOnOpen}
            />
          }
        />
        <CardContent sx={cardStyles.cardContent}>
          <Grid container>
            <Grid item sx={cardStyles.priorityField}>
              <PriorityItem priority={priority} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={7} sx={cardStyles.textField}>
              <Typography variant='inherit' color='text.secondary'>
                Created at: {new Date(Number(createdDate)).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={3} sx={commonStyles.inputMovedToEnd}>
              <CreatedByItem owner={user} />
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
