import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { State } from '../../../../types/state';
import { storyStyle } from '../../../../styles/storyStyle';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { StoryCard } from '../../Card/StoryCard';
import { StoryModel } from '../../../../types/story';
import { StatesListItem } from '../../../common/StatesList/StatesListItem';

interface StoryListViewProps {
  stories: Array<StoryModel> | undefined;
  handleCreateStoryOnOpen: () => void;
}

export const StoriesList: React.FC<StoryListViewProps> = ({
  stories,
  handleCreateStoryOnOpen,
}) => {
  if (!stories?.length) {
    return (
      <Box sx={projectPageStyles.wrapper}>
        <p>There are no stories yet</p>
        <Button onClick={handleCreateStoryOnOpen}>Create new story</Button>
      </Box>
    );
  };

  return (
    <Box display='grid' sx={storyStyle.box}>
      <Grid container>
        {Object.values(State).map((state) => {
          const filteredStories = stories?.filter(
            (story) => story.state === state
          );

          return (
            <Grid item xs={4} key={state}>
              <StatesListItem text={state} />
              {filteredStories?.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}