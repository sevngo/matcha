import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import store from './store';
import { locale, messages, theme } from './utils';
import App from './containers/App';
import socketEvents from './socketIo/events';
import socket from './socketIo';

const ROOT = (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </IntlProvider>
  </Provider>
);

socketEvents(socket);

render(ROOT, document.getElementById('root'));
