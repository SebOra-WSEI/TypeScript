import React from 'react';
import { Grid, Typography } from '@mui/material';
import { cardStyles } from '../../../../styles/cardStyles';

interface TaskDateFieldsProps {
  expectedEndTime: Date;
  startDate?: Date;
  endDate?: Date;
}

export const TaskDateFields: React.FC<TaskDateFieldsProps> = ({
  expectedEndTime,
  endDate,
  startDate,
}) => (
  <>
    <Grid item xs={8} sx={cardStyles.textField}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant='inherit' fontSize={15} color='secondary'>
            Start at:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='inherit' fontSize={15} color='secondary'>
            {startDate ? new Date(startDate).toLocaleString() : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={8} sx={cardStyles.textField}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant='inherit' fontSize={15} color='secondary'>
            Expected end at:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='inherit' fontSize={15} color='secondary'>
            {new Date(expectedEndTime).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={8} sx={cardStyles.textField}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant='inherit' fontSize={15} color='secondary'>
            {' '}
            End at:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='inherit' fontSize={15} color='secondary'>
            {endDate ? new Date(endDate).toLocaleString() : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </>
);
