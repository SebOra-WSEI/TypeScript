import { Box, Button, Divider, Grid } from '@mui/material';
import React from 'react';
import { State } from '../../../types/state';
import { storageStyle } from '../../../styles/storageStyle';
import { StorageModel } from '../../../controllers/storage';
import { projectPageStyles } from '../../../styles/projectPageStyles';

interface StorageListViewProps {
  storages: Array<StorageModel> | undefined;
}

export const StoragesList: React.FC<StorageListViewProps> = ({
  storages,
}) => (
  <>
    {!storages?.length ? (
      <Box sx={projectPageStyles.wrapper}>
        <p>There are no storages yet</p>
        <Button>Create new storage</Button>
      </Box>
    ) : (
      <Box display='grid' sx={storageStyle.box}>
        <Grid container spacing={2}>
          {Object.values(State).map((state) => {
            const filteredStorages = storages?.filter(
              (storage) => storage.state === state
            );

            return (
              <Grid item xs={4} key={state}>
                <GridItem text={state} />
                {filteredStorages?.map((s) => <div key={s.id}>{s.name}</div>)}
                <Divider orientation='vertical' />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    )}
  </>
);

const GridItem: React.FC<{ text: string }> = ({ text }) => (
  <p style={{
    textAlign: 'center',
    fontWeight: 'bold',
  }}>
    {text}
  </p>
);
