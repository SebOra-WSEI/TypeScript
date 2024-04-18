import {
  Avatar,
  Typography,
} from '@mui/material';
import React from 'react';
import { storyStyle } from '../../../../styles/storyStyle';
import { UserModel } from '../../../../types/user';

export const CreatedByItem: React.FC<{ owner?: UserModel }> = ({ owner }) => (
  <Avatar sx={storyStyle.avatar}>
    <Typography fontSize='small'>
      {owner?.name?.[0]}
      {owner?.surname?.[0]}
    </Typography>
  </Avatar>
);