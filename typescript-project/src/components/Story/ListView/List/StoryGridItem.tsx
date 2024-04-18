import React from "react";

export const StoryGridItem: React.FC<{ text: string }> = ({ text }) => (
  <p
    style={{
      textAlign: 'center',
      fontWeight: 'bold',
    }}
  >
    {text}
  </p>
);
