import React from 'react';
import { Button } from '@mui/material';

interface NoProjectsMessageProps {
  handleOnOpen: () => void;
}

export const NoProjectsMessage: React.FC<NoProjectsMessageProps> = ({
  handleOnOpen,
}) => (
  <>
    <p>There are no projects yet</p>
    <Button onClick={handleOnOpen}>Create new project</Button>
  </>
);
