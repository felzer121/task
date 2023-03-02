import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './store/auth'
import { RouterManeger } from "./RouterManeger/Router";
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFBE2E',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterManeger />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
