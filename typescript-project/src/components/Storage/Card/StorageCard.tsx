import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItemIcon,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { priorityIcons } from '../../../types/priority';
import { storageStyle } from '../../../styles/storageStyle';
import { StorageCardMenu } from './StorageCardMenu';
import { StorageModel } from '../../../types/storage';
import { useRemoveStorage } from '../../../api/storage/useRemoveStorage';
import { SeverityOption } from '../../../types/severity';

interface StorageCardProps {
  storage: StorageModel
  setSeverity: (value: SeverityOption) => void;
  setSeverityText: (value: string) => void;
}

export const StorageCard: React.FC<StorageCardProps> = ({
  storage,
  setSeverity,
  setSeverityText
}) => {
  const { error, message, remove } = useRemoveStorage();

  const { id, name, description, priority, date, owner } = storage;

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

  const handleRemove = (): void => {
    console.log(remove(id))
    remove(id)
  };

  return (
    <Card sx={storageStyle.card}>
      <CardHeader
        title={<Header text={name} isTitle />}
        subheader={<Header text={description ?? ''} />}
        action={<StorageCardMenu handleRemove={handleRemove} />}
      />
      <CardContent sx={storageStyle.cardContent}>
        <Grid container>
          <Grid item sx={storageStyle.priority}>
            <ListItemIcon>
              {priorityIcons[priority]}
              <Typography
                variant="inherit"
                color="text.secondary"
                fontSize='small'
              >
                {priority}
              </Typography>
            </ListItemIcon>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5} sx={storageStyle.date}>
            <Typography
              variant="inherit"
              color="text.secondary"
            >
              Created at: {new Date(date).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={storageStyle.icon}>
            <Avatar sx={storageStyle.avatar}>
              <Typography fontSize='small'>
                {owner?.name[0]}{owner?.surname[0]}
              </Typography>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const Header: React.FC<{ text: string, isTitle?: boolean }> = ({
  text,
  isTitle = false
}) => (
  <span style={{ fontSize: 'small' }}>
    {isTitle ? <strong>{text}</strong> : <>{text}</>}
  </span>
);