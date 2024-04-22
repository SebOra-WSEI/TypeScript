import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { boxStyles } from "../../../styles/box";
import { useHistory } from "react-router";
import { routes } from "../../../routes/routes";
import { handleLogout } from "../../../utils/logout";
import { messageStyles } from "../../../styles/message";

export const UserAlreadyLoggedMessage: React.FC = () => {
  const history = useHistory();

  return (
    <Box sx={boxStyles}>
      <Card>
        <CardContent>
          <h3 style={messageStyles.header}>User already logged in</h3>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='error'
            size='small'
            sx={messageStyles.button}
            onClick={() => {
              handleLogout();
              window.location.replace(routes.login);
            }}
          >
            Log out
          </Button>
          <Button
            variant='outlined'
            size='small'
            sx={messageStyles.button}
            onClick={() => history.push(routes.projects)}
          >
            Move to projects list
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};