import React from 'react';

export const TaskCardHeader: React.FC<{ text: string; isTitle?: boolean }> = ({
  text,
  isTitle = false,
}) => (
  <span style={styles}>
    {isTitle ? <strong>{text}</strong> : <>{text}</>}
  </span>
);

const styles = {
  fontSize: 'small'
}