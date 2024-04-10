import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { State } from '../../../../types/state';
import { storyStyle } from '../../../../styles/storyStyle';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { StoryModel } from '../../../../types/story';

interface TasksListProps {
  tasks: Array<StoryModel> | undefined;
  handleCreateTaskOnOpen: () => void;
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks: stories,
  handleCreateTaskOnOpen
}) => (
  <>
    {!stories?.length ? (
      <Box sx={projectPageStyles.wrapper}>
        <p>There are no tasks yet</p>
        <Button onClick={handleCreateTaskOnOpen}>Create new task</Button>
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
                  // <StoryCard key={storage.id} story={storage} />
                  <div>abc</div>
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
