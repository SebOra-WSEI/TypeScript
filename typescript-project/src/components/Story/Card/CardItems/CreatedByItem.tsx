import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { UserModel } from '../../../../types/user';

export const CreatedByItem: React.FC<{ owner?: UserModel }> = ({ owner }) => (
  <Avatar sx={styles.avatar}>
    <Typography fontSize='small'>
      {owner?.name?.[0]}
      {owner?.surname?.[0]}
    </Typography>
  </Avatar>
);

const styles = {
  avatar: {
    width: 30,
    height: 30,
  },
};