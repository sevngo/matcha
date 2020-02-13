// This file is not in client folder to match create-react-app webpack src/index entry point

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import './socketEvents';
import { locale, messages, theme } from './utils';
import store from './store';
import App from './containers/App';

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

render(ROOT, document.getElementById('root'));
