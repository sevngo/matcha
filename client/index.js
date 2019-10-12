import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/dist/locale-data/en';
import '@formatjs/intl-pluralrules/dist/locale-data/fr';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import io from 'socket.io-client';
import socketEvents from './socketEvents';
import { locale, messages, theme } from './utils';
import store from './store';
import App from './components/App';

export const socket = io('http://localhost:8080');
socketEvents(socket);

const ROOT = (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={10}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </IntlProvider>
  </Provider>
);

render(ROOT, document.getElementById('root'));
