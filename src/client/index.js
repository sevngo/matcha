import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';
import store from './store';
import { locale, messages, theme } from './utils';
import App from './containers/App';
import socketEvents from './socketIo/events';
import socket from './socketIo';

const ROOT = (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </IntlProvider>
  </Provider>
);

const container = document.getElementById('container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(ROOT);

socketEvents(socket);
