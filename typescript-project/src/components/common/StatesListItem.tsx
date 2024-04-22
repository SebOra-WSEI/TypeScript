import React from 'react';

interface StatesListItemProps {
  text: string;
}

export const StatesListItem: React.FC<StatesListItemProps> = ({ text }) => (
  <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{text}</p>
);
