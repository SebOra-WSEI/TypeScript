import { Box, Divider, Grid } from '@mui/material';
import React from 'react';
import { State } from '../../../types/state';
import { storagePageStyle } from '../../../styles/storage';

export const StorageListView: React.FC = () => {

  return (
    <Box display='grid' sx={storagePageStyle.box}>
      <Grid container spacing={2} sx={storagePageStyle.gridHeader}>
        {Object.values(State).map((s) => (
          <Grid item xs={4} key={s}>
            <p>{s}</p>
            <Divider orientation="vertical" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};