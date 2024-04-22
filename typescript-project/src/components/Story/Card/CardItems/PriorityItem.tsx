import React from 'react';
import { ListItemIcon, Typography } from '@mui/material';
import { PRIORITY_ICONS } from '../../../../utils/priorityIcons';
import { Priority } from '../../../../types/priority';

interface PriorityItemProps {
  priority: Priority;
}

export const PriorityItem: React.FC<PriorityItemProps> = ({ priority }) => (
  <ListItemIcon>
    {PRIORITY_ICONS[priority]}
    <Typography variant='inherit' color='text.secondary' fontSize='small'>
      {priority}
    </Typography>
  </ListItemIcon>
);
