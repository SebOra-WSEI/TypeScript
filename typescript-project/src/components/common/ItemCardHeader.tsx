import React from 'react';

interface ItemTaskHeaderProps {
  text: string;
  isTitle?: boolean;
}

export const ItemTaskHeader: React.FC<ItemTaskHeaderProps> = ({
  text,
  isTitle = false,
}) => (
  <span style={styles}>{isTitle ? <strong>{text}</strong> : <>{text}</>}</span>
);

const styles = {
  fontSize: 'small',
};
