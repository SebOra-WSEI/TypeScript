import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React from 'react';

export const StoryPointsItem: React.FC<{ storyPoint: number }> = ({
  storyPoint,
}) => (
  <>
    <span style={styles.color}>Story Points:</span>
    <div style={styles.div}>
      <Avatar sx={styles.avatar}>
        <span style={styles.span}>{storyPoint}</span>
      </Avatar>
    </div>
  </>
);

const styles = {
  color: {
    color: '#757575',
  },
  div: {
    display: 'inline-block',
    marginLeft: '0.3rem',
  },
  avatar: {
    width: 15,
    height: 15,
    bgcolor: deepPurple[500],
  },
  span: {
    fontSize: 10,
  },
};
