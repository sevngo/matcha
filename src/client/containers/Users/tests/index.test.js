import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Users', () => {
  it('should render then open drawer', () => {
    const { getByTestId, queryByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('drawer')).toBeNull();
    fireEvent.click(getByTestId('openDrawer'));
    getByTestId('drawer');
  });
});
