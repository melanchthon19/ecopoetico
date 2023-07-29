import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Navbar from './components/Navbar';

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
});

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
