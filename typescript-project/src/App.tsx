import React, { useEffect, useMemo } from 'react';
import { AppNavigator } from './AppNavigator';
import { SnackbarAlert } from './components/Snackbar/SnackbarAlert';
import { ThemeProvider } from '@emotion/react';
import { PaletteMode, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useAppContextProvider } from './AppContext';

export const App: React.FC = () => {
  const { mode } = useAppContextProvider();

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode]
  );

  useEffect(() => {
    document.cookie = 'mode' + '=' + mode + ';';
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
      <SnackbarAlert />
    </>
  );
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' && {
      secondary: {
        main: grey[900],
      },
    }),
    ...(mode === 'dark' && {
      background: {
        default: '#fff',
      },
      text: {
        secondary: grey[700],
      },
      secondary: {
        main: '#edf2ff',
      },
    }),
  },
});
