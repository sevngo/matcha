import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../reducers';
import { theme } from '../../utils/theme';

jest.mock('../../store');

const TestProvider = ({
  children,
  initialState = {},
  router: { initialEntries, path } = {},
}) => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <IntlProvider locale="en" messages={{}}>
        <MemoryRouter initialEntries={initialEntries}>
          <Route path={path}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
          </Route>
        </MemoryRouter>
      </IntlProvider>
    </Provider>
  );
};

export default TestProvider;
