import React from 'react';
import { render } from '@testing-library/react';
import App from '.';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MuiThemeProvider } from '@material-ui/core';
import { messages, theme } from '../../utils';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('should render without crash', () => {
    const Component = () => (
      <Provider store={store}>
        <IntlProvider locale="en" messages={messages}>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MuiThemeProvider>
        </IntlProvider>
      </Provider>
    );
    render(<Component />);
  });
});
