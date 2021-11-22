import {
  createTheme, GlobalStyles, PaletteMode, useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { toggleTheme } from './redux/reducers/app';
import AppRoutes from './routes/AppRoutes';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

const App = () => {
  const { theme: themeMode } = useAppSelector((state) => state.app);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prefersDarkMode && !localStorage.getItem('theme')) {
      dispatch(toggleTheme({ mode: 'dark' }));
    }
  }, [prefersDarkMode]);

  // Update the theme only if the mode changes
  const theme = useMemo(() => (
    createTheme(getDesignTokens(themeMode))
  ), [themeMode]);

  const scrollbarGlobalStyles = (
    <GlobalStyles styles={{
      '*::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.primary.main },
      '*': { scrollbarColor: `${theme.palette.primary.main} transparent` },
    }}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      {scrollbarGlobalStyles}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
