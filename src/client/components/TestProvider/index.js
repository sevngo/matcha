import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { createStore } from 'redux';
import { IntlProvider } from 'react-intl';
import { theme } from '../../utils/theme';
import defaultInitialState from './initialState';

// export const MUI_PICKER_UTILS = 'MUI_PICKER_UTILS';
// export const ROUTER = 'ROUTER';
// export const MUI_THEME = 'MUI_THEME';
// export const INTL = 'INTL';
// export const REDUX = 'REDUX';
// export const POCKET = 'POCKET';

// const TestProvider = ({ children, providers = [], initialState = defaultInitialState }) => {
//   const store = configureStore(initialState);
//   const hasProvider = contains(__, providers);
//   let Component = children;
//   if (hasProvider(ROUTER)) Component = <BrowserRouter>{Component}</BrowserRouter>;
//   if (hasProvider(MUI_THEME))
//     Component = <MuiThemeProvider theme={theme}>{Component}</MuiThemeProvider>;
//   if (hasProvider(INTL)) Component = <LanguageProvider messages={{}}>{Component}</LanguageProvider>;
//   if (hasProvider(REDUX)) Component = <Provider store={store}>{Component}</Provider>;
//   return Component;
// };

const TestProvider = ({
  children = <div />,
  providers = [],
  initialState = defaultInitialState,
}) => {
  return (
    <IntlProvider locale="en" messages={{}}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </BrowserRouter>
    </IntlProvider>
  );
};

// const TestProvider = ({ children, providers = [], initialState = defaultInitialState }) => {
//   // const store = createStore(reducer, initialState);
//   return (
//     <Provider store={store}>
//       <IntlProvider messages={{}}>
//         <BrowserRouter>
//           <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
//         </BrowserRouter>
//       </IntlProvider>
//     </Provider>
//   );
// };

export default TestProvider;
