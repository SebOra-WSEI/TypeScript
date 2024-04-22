import React from "react";
import {
  Box,
  Card,
  CardContent
} from "@mui/material";
import { boxStyles } from "../../../styles/boxStyles";
import { messageStyles } from "../../../styles/messageStyles";

interface UnknownErrorProps {
  errorMessage: string
}

export const UnknownError: React.FC<UnknownErrorProps> = ({ errorMessage }) => (
  <Box sx={boxStyles}>
    <Card>
      <CardContent>
        <h3 style={messageStyles.header}>Unknown Error</h3>
        <p><strong>Error message:</strong>{' '}{errorMessage}</p>
      </CardContent>
    </Card>
  </Box>
);