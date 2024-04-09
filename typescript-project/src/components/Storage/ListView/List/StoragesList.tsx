import {
  Box,
  Button,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { State } from '../../../../types/state';
import { storageStyle } from '../../../../styles/storageStyle';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { StorageCard } from '../../Card/StorageCard';
import { StorageModel } from '../../../../types/storage';
import { SeverityOption } from '../../../../types/severity';
import { SnackbarAlert } from '../../../common/SnackbarAlert';

interface StorageListViewProps {
  storages: Array<StorageModel> | undefined;
}

export const StoragesList: React.FC<StorageListViewProps> = ({
  storages,
}) => {
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );

  return (
    <>
      {!storages?.length ? (
        <Box sx={projectPageStyles.wrapper}>
          <p>There are no storages yet</p>
          <Button>Create new storage</Button>
        </Box>
      ) : (
        <Box display='grid' sx={storageStyle.box}>
          <Grid container>
            {Object.values(State).map((state) => {
              const filteredStorages = storages?.filter(
                (storage) => storage.state === state
              );

              return (
                <Grid item xs={4} key={state}>
                  <GridItem text={state} />
                  {filteredStorages?.map((storage) => (
                    <StorageCard
                      key={storage.id}
                      storage={storage}
                      setSeverity={setSeverity}
                      setSeverityText={setSeverityText}
                    />
                  ))}
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
    </>
  );
}

const GridItem: React.FC<{ text: string }> = ({ text }) => (
  <p style={{
    textAlign: 'center',
    fontWeight: 'bold',
  }}>
    {text}
  </p>
);
