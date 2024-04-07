import { Box, Divider, Grid } from '@mui/material';
import React from 'react';
import { State } from '../../../types/state';
import { storagePageStyle } from '../../../styles/storage';
import { StorageModel } from '../../../controllers/storage';

interface StorageListViewProps {
  storages: Array<StorageModel> | undefined
}

export const StorageListView: React.FC<StorageListViewProps> = ({
  storages
}) => (
  <Box display='grid' sx={storagePageStyle.box}>
    <Grid container spacing={2} sx={storagePageStyle.gridHeader}>
      {Object.values(State).map((state) => {
        const filteredStorages = storages?.filter(
          (storage) => storage.state === state
        );

        return (
          <Grid item xs={4} key={state}>
            <p>{state}</p>
            {filteredStorages?.map((s) => (
              <div key={s.id}>{s.name}</div>
            ))}
            <Divider orientation="vertical" />
          </Grid>
        )
      })}
    </Grid>
  </Box>
);