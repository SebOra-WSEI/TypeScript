import { Box, Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import React from 'react';

export const CreateProjectPage: React.FC = () => {
  return (
    <>
      <Box component='form' onSubmit={() => console.log('ss')}>
        <Card>
          <CardContent>
            <h3>Create new project</h3>
            <TextField
              label='Name *'
              variant='standard'
              type='text'
              autoComplete='name'
              autoFocus
              value={name}
              fullWidth
            // onChange={(evt) =>
            //   setBody({
            //     ...body,
            //     name: evt.target.value,
            //   })
            // }
            />
            <TextField
              label='Description'
              variant='standard'
              type='text'
              autoComplete='description'
              value={name}
              fullWidth
            // onChange={(evt) =>
            //   setBody({
            //     ...body,
            //     name: evt.target.value,
            //   })
            // }
            />
          </CardContent>
          <CardActions>
            <Button type='submit' variant='contained'>
              Create
            </Button>
          </CardActions>
        </Card>
      </Box>
      {/* <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={snackbarMessage}
      /> */}
    </>
  )
};
