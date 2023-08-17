import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import './fonts.css';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Navbar from './components/Navbar';
import PoemProvider from './components/PoemContext';
import Print from './pages/Print';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto,sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#eeeeee',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '16px', // Set the desired font size
        },
      },
    },
  },
});

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <PoemProvider>
            <Navbar />
            <Routes>
              <Route path="/react_test" element={<Home />} />
              <Route path="/print" element={<Print />} />
            </Routes>
          </PoemProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
