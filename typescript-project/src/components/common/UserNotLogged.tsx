import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { boxStyles } from "../../styles/box";
import { useHistory } from "react-router";
import { routes } from "../../routes/routes";

export const UserNotLogged: React.FC = () => {
  const history = useHistory();

  return (
    <Box sx={boxStyles} >
      <Card>
        <CardContent>
          User not found. Please log in
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            size='small'
            sx={styles.button}
            onClick={() => history.push(routes.login)}
          >
            Log in
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

const styles = {
  button: {
    marginLeft: 'auto'
  }
};