import React from 'react';
import { render } from '@testing-library/react';
import App from '.';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { messages, theme } from '../../utils';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('should render without crash', () => {
    const Component = () => (
      <Provider store={store}>
        <IntlProvider locale="en" messages={messages}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </StyledEngineProvider>
        </IntlProvider>
      </Provider>
    );
    render(<Component />);
  });
});
