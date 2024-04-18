import { Button } from '@mui/material';
import React from 'react';

export const NoProjectsMessage: React.FC<{
  handleOnOpen: () => void;
}> = ({ handleOnOpen }) => (
  <>
    <p>There are no projects yet</p>
    <Button onClick={handleOnOpen}>Create new project</Button>
  </>
);
