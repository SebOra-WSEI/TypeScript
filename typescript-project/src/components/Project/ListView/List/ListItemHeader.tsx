import React from 'react';

interface ListItemHeaderProps {
  field: string;
  value: string;
}

export const ListItemHeader: React.FC<ListItemHeaderProps> = ({
  field,
  value,
}) => (
  <span>
    <strong>{field}:</strong> {value}
  </span>
);
