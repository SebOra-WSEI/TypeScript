import React from 'react';

export const ListItemHeader: React.FC<{
  field: string;
  value: string;
}> = ({ field, value }) => (
  <span>
    <strong>{field}:</strong> {value}
  </span>
);
