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
    <Grid item xs={8} sx={cardStyles.gridText}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant='inherit' fontSize={15}>
            Start at:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='inherit' fontSize={15}>
            {startDate ? new Date(startDate).toLocaleString() : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={8} sx={cardStyles.gridText}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant='inherit' fontSize={15}>
            Expected end at:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='inherit' fontSize={15}>
            {new Date(expectedEndTime).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={8} sx={cardStyles.gridText}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant='inherit' fontSize={15}>
            {' '}
            End at:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='inherit' fontSize={15}>
            {endDate ? new Date(endDate).toLocaleString() : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </>
);
