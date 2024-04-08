import {
  Avatar,
  Card, CardContent,
  CardHeader,
  Grid,
  ListItemIcon,
  Typography
} from '@mui/material';
import React from 'react';
import { priorityIcons } from '../../../types/priority';
import { StorageModel } from '../../../controllers/storage';
import { storageStyle } from '../../../styles/storageStyle';

export const StorageCard: React.FC<{
  storage: StorageModel
}> = ({ storage }) => (
  <Card sx={storageStyle.card}>
    <CardHeader
      title={<Header text={storage.name} isTitle />}
      subheader={<Header text={storage?.description ?? ''} />}
    />
    <CardContent sx={storageStyle.cardContent}>
      <Grid container>
        <Grid item sx={storageStyle.priority}>
          <ListItemIcon>
            {priorityIcons[storage.priority]}
            <Typography
              variant="inherit"
              color="text.secondary"
              fontSize='small'
            >
              {storage.priority}
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
            Created at: {new Date(storage.date).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={storageStyle.icon}>
          <Avatar sx={storageStyle.avatar}>
            {storage.ownerId[0]}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const Header: React.FC<{ text: string, isTitle?: boolean }> = ({
  text,
  isTitle = false
}) => (
  <span style={{ fontSize: 'small' }}>
    {isTitle ? <strong>{text}</strong> : <>{text}</>}
  </span>
);