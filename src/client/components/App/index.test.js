import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../TestProvider';
import App from '.';

describe('App', () => {
  const Component = (
    <TestProvider>
      <App />
    </TestProvider>
  );
  it('should render without crash', () => {
    const { container } = render(Component);
    expect(container).toBeDefined();
  });
});
