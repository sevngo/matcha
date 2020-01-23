import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import { theme } from '../../utils/theme';
import reducer from '../../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import defaultInitialState from './initialState';

jest.mock('../../store');

const TestProvider = ({ children, initialState = defaultInitialState }) => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
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
