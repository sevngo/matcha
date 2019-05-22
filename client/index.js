import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { addLocaleData } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localeFr from 'react-intl/locale-data/fr';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { locale, messages } from './intl';
import store from './store';
import theme from './theme';
import App from './components/App';

import io from 'socket.io-client';

export const socket = io('http://localhost:8080');

socket.on('friendLogged', friend => console.log('friendLogged', friend));
socket.on('userLiked', user => console.log('userLiked', user));

addLocaleData([...localeEn, ...localeFr]);

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
