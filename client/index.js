import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import store from './store';
import App from './components/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#fff',
    },
  },
});

const ROOT = (
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={10}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);

render(ROOT, document.getElementById('root'));
