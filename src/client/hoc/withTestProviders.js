import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../store/reducer';
import { messages } from '../utils';
import { theme } from '../utils/theme';

jest.mock('../store');

const withTestProviders =
  (
    Component,
    { initialState = {}, initialEntries, initialPath = '/', aimedPath } = {}
  ) =>
  (props) => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <IntlProvider locale="en" messages={messages}>
          <MuiThemeProvider theme={theme}>
            <MemoryRouter initialEntries={initialEntries}>
              <Routes>
                <Route path={initialPath} element={<Component {...props} />} />
                {aimedPath && (
                  <Route
                    path={aimedPath}
                    element={<div data-testid="aimedPath" />}
                  />
                )}
              </Routes>
            </MemoryRouter>
          </MuiThemeProvider>
        </IntlProvider>
      </Provider>
    );
  };

export default withTestProviders;
