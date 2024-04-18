import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React from 'react';

export const StoryPointsItem: React.FC<{ storyPoint: number }> = ({
  storyPoint,
}) => (
  <>
    <span style={{ color: '#757575' }}>Story Points:</span>
    <div style={{ display: 'inline-block', marginLeft: '0.3rem' }}>
      <Avatar sx={{ width: 15, height: 15, bgcolor: deepPurple[500] }}>
        <span style={{ fontSize: 10 }}>{storyPoint}</span>
      </Avatar>
    </div>
  </>
);
