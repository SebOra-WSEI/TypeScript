import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { boxStyles } from "../../../styles/box";
import { useHistory } from "react-router";
import { routes } from "../../../routes/routes";
import { messageStyles } from "../../../styles/message";

export const UserNotLoggedMessage: React.FC<{ text: string }> = ({ text }) => {
  const history = useHistory();

  return (
    <Box sx={boxStyles} >
      <Card>
        <CardContent>
          <h3 style={messageStyles.header}>User not found. Please log in</h3>
          <p><strong>Error message:</strong>{' '}{text}</p>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            size='small'
            sx={messageStyles.button}
            onClick={() => history.push(routes.login)}
          >
            Log in
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};