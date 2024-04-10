import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { State } from '../../../../types/state';
import { storyStyle } from '../../../../styles/storyStyle';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { StoryCard } from '../../Card/StoryCard';
import { StoryModel } from '../../../../types/story';

interface StorageListViewProps {
  stories: Array<StoryModel> | undefined;
  handleCreateStoryOnOpen: () => void;
}

export const StoriesList: React.FC<StorageListViewProps> = ({
  stories,
  handleCreateStoryOnOpen
}) => (
  <>
    {!stories?.length ? (
      <Box sx={projectPageStyles.wrapper}>
        <p>There are no stories yet</p>
        <Button onClick={handleCreateStoryOnOpen}>Create new story</Button>
      </Box>
    ) : (
      <Box display='grid' sx={storyStyle.box}>
        <Grid container>
          {Object.values(State).map((state) => {
            const filteredStorages = stories?.filter(
              (story) => story.state === state
            );

            return (
              <Grid item xs={4} key={state}>
                <GridItem text={state} />
                {filteredStorages?.map((storage) => (
                  <StoryCard key={storage.id} story={storage} />
                ))}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    )}
  </>
);

const GridItem: React.FC<{ text: string }> = ({ text }) => (
  <p
    style={{
      textAlign: 'center',
      fontWeight: 'bold',
    }}
  >
    {text}
  </p>
);
