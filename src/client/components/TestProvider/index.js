import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import { theme } from '../../utils/theme';
import store from '../../store';

const TestProvider = ({ children = <div /> }) => {
  return (
    <Provider store={store}>
      <IntlProvider locale="en" messages={{}}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

export default TestProvider;
