import React from 'react';
import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import { useHistory } from 'react-router';
import { messageStyles } from '../../../styles/messageStyles';
import { commonStyles } from '../../../styles/commonStyles';

export const PageNotFoundMessage: React.FC = () => {
  const history = useHistory();

  return (
    <Box sx={commonStyles.centeredBox}>
      <Card>
        <CardContent>
          <h3 style={messageStyles.header}>404 - Page not found</h3>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            size='small'
            sx={messageStyles.button}
            onClick={history.goBack}
          >
            Move back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
