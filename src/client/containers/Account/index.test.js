import '@testing-library/jest-dom';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import withTestProviders from '../../hoc/withTestProviders';
import Account from '.';
import { userPath } from '../../utils';

describe('Account', () => {
  it('should open and close menu by clicking logout', async () => {
    const Component = withTestProviders(Account);
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('accountMenu')).not.toBeInTheDocument();
    fireEvent.click(queryByTestId('accountButton'));
    expect(queryByTestId('accountMenu')).toBeInTheDocument();
    fireEvent.click(queryByTestId('logout'));
    await waitForElementToBeRemoved(queryByTestId('accountMenu'));
  });

  it('should open menu and redirect to userPath by clicking on goToMyUser', async () => {
    const initialState = { auth: { _id: '60084a46203c4e342b14114c' } };
    const aimedPath = userPath(':id');
    const Component = withTestProviders(Account, { initialState, aimedPath });

    const { queryByTestId, getByTestId } = render(<Component />);
    expect(queryByTestId('accountMenu')).not.toBeInTheDocument();
    fireEvent.click(queryByTestId('accountButton'));
    expect(queryByTestId('accountMenu')).toBeInTheDocument();
    fireEvent.click(queryByTestId('goToMyUser'));
    expect(queryByTestId('accountMenu')).not.toBeInTheDocument();
    getByTestId('aimedPath');
  });

  it('should open and close menu by clicking outside', async () => {
    const Component = withTestProviders(Account);

    const { queryByTestId, getByRole } = render(<Component />);
    expect(queryByTestId('accountMenu')).not.toBeInTheDocument();
    fireEvent.click(queryByTestId('accountButton'));
    expect(queryByTestId('accountMenu')).toBeInTheDocument();
    fireEvent.click(getByRole('presentation').firstChild);
    await waitForElementToBeRemoved(queryByTestId('accountMenu'));
  });
});
