import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography
} from '@mui/material';
import { StoryCardMenu } from './StoryCardMenu';
import { StoryModel } from '../../../types/story';
import { cardStyles } from '../../../styles/cardStyles';
import { PriorityItem } from './CardItems/PriorityItem';
import { CreatedByItem } from './CardItems/CreatedByItem';
import { ItemTaskHeader } from '../../common/ItemCardHeader';
import { EditStoryModal } from '../Form/Edit/EditStoryModal';
import { commonStyles } from '../../../styles/commonStyles';

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
            <Grid item sx={cardStyles.priority}>
              <PriorityItem priority={priority} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5} sx={cardStyles.gridText}>
              <Typography variant='inherit' color='text.secondary'>
                Created at: {new Date(date).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={commonStyles.inputField}>
              <CreatedByItem owner={owner} />
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