import { Box, Card, CardContent } from '@mui/material';
import React from 'react';
import { boxStyles } from '../../styles/box';

export const NotFound: React.FC = () => (
  <Box sx={boxStyles} >
    <Card>
      <CardContent>
        404 - Page not found
      </CardContent>
    </Card>
  </Box>
);
