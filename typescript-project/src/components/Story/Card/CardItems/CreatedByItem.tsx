import React from 'react';
import { Avatar, Typography } from '@mui/material';
import { UserModel } from '../../../../types/user';

interface CreatedByItemProps {
  owner?: UserModel;
}

export const CreatedByItem: React.FC<CreatedByItemProps> = ({ owner }) => (
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
