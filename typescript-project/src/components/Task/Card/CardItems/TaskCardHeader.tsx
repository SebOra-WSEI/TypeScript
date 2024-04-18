import React from 'react';

export const TaskCardHeader: React.FC<{ text: string; isTitle?: boolean }> = ({
  text,
  isTitle = false,
}) => (
  <span style={{ fontSize: 'small' }}>
    {isTitle ? <strong>{text}</strong> : <>{text}</>}
  </span>
);
