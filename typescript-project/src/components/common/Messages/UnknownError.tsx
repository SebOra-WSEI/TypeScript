import { Box, Card, CardContent } from "@mui/material";
import React from "react";
import { boxStyles } from "../../../styles/box";
import { messageStyles } from "../../../styles/message";

export const UnknownError: React.FC<{ errorMessage: string }> = ({ errorMessage }) => (
  <Box sx={boxStyles} >
    <Card>
      <CardContent>
        <h3 style={messageStyles.header}>Unknown Error</h3>
        <p><strong>Error message:</strong>{' '}{errorMessage}</p>
      </CardContent>
    </Card>
  </Box>
)