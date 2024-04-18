import React from 'react';
import { ListItemIcon, Typography } from '@mui/material';
import { priorityIcons } from '../../../../utils/priorityIcons';
import { Priority } from '../../../../types/priority';

export const PriorityItem: React.FC<{ priority: Priority }> = ({
  priority,
}) => (
  <ListItemIcon>
    {priorityIcons[priority]}
    <Typography variant='inherit' color='text.secondary' fontSize='small'>
      {priority}
    </Typography>
  </ListItemIcon>
);
