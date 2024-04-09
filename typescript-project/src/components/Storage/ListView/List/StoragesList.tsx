import { Box, Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { State } from '../../../../types/state';
import { storageStyle } from '../../../../styles/storageStyle';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { StorageCard } from '../../Card/StorageCard';
import { StorageModel } from '../../../../types/storage';
import { SeverityOption } from '../../../../types/severity';
import { useRemoveStorage } from '../../../../api/storage/useRemoveStorage';

interface StorageListViewProps {
  storages: Array<StorageModel> | undefined;
  handleCreateStorageOnOpen: () => void;
  setSeverity: (value: SeverityOption) => void;
  setSeverityText: (value: string) => void;
}

export const StoragesList: React.FC<StorageListViewProps> = ({
  storages,
  handleCreateStorageOnOpen,
  setSeverity,
  setSeverityText,
}) => {
  const { error, message, remove } = useRemoveStorage();

  useEffect(() => {
    if (error) {
      setSeverity(SeverityOption.Error);
      setSeverityText(error);
    }

    if (message) {
      setSeverity(SeverityOption.Success);
      setSeverityText(message);
    }
  }, [error, message]);

  return (
    <>
      {!storages?.length ? (
        <Box sx={projectPageStyles.wrapper}>
          <p>There are no storages yet</p>
          <Button onClick={handleCreateStorageOnOpen}>
            Create new storage
          </Button>
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
                      handleRemove={() => remove(storage.id)}
                    />
                  ))}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
};

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
