import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItemIcon,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { priorityIcons } from '../../../types/priority';
import { storageStyle } from '../../../styles/storageStyle';
import { StorageCardMenu } from './StorageCardMenu';
import { StorageModel } from '../../../types/storage';
import { EditStorageModal } from '../Edit/Modal/EditStorageModal';

interface StorageCardProps {
  storage: StorageModel;
}

export const StorageCard: React.FC<StorageCardProps> = ({ storage }) => {
  const [isEditStorageModalOpen, setIsEditStorageModalOpen] =
    useState<boolean>(false);

  const { name, description, priority, date, owner } = storage;

  const handleEditStorageOnOpen = (): void => setIsEditStorageModalOpen(true);
  const handleEditStorageOnClose = (): void => setIsEditStorageModalOpen(false);

  return (
    <>
      <Card sx={storageStyle.card}>
        <CardHeader
          title={<Header text={name} isTitle />}
          subheader={<Header text={description ?? ''} />}
          action={
            <StorageCardMenu
              storage={storage}
              handleEditStorageOnOpen={handleEditStorageOnOpen}
            />
          }
        />
        <CardContent sx={storageStyle.cardContent}>
          <Grid container>
            <Grid item sx={storageStyle.priority}>
              <ListItemIcon>
                {priorityIcons[priority]}
                <Typography
                  variant='inherit'
                  color='text.secondary'
                  fontSize='small'
                >
                  {priority}
                </Typography>
              </ListItemIcon>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5} sx={storageStyle.date}>
              <Typography variant='inherit' color='text.secondary'>
                Created at: {new Date(date).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={storageStyle.icon}>
              <Avatar sx={storageStyle.avatar}>
                <Typography fontSize='small'>
                  {owner?.name?.[0]}
                  {owner?.surname?.[0]}
                </Typography>
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <EditStorageModal
        isOpen={isEditStorageModalOpen}
        onClose={handleEditStorageOnClose}
        storage={storage}
      />
    </>
  );
};

const Header: React.FC<{ text: string; isTitle?: boolean }> = ({
  text,
  isTitle = false,
}) => (
  <span style={{ fontSize: 'small' }}>
    {isTitle ? <strong>{text}</strong> : <>{text}</>}
  </span>
);
