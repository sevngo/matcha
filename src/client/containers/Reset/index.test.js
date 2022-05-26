import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from '../../api';
import withTestProviders from '../../hoc/withTestProviders';
import Reset from '.';
import { resetPath, usersPath } from '../../utils';

jest.mock('../../api');

describe('Reset', () => {
  const _id = '60084a46203c4e342b14114c';
  const Component = withTestProviders(Reset, {
    initialPath: resetPath(':id'),
    initialEntries: [resetPath(_id)],
    aimedPath: usersPath,
  });

  it('should pathUser then redirect to usersPath', async () => {
    const { getByTestId, getByRole, findByTestId } = render(<Component />);

    const password = 'password';

    fireEvent.change(getByTestId('passwordInput'), {
      target: { value: password },
    });
    axios.patch.mockResolvedValue({
      data: {
        address: {
          coordinates: [2.5654428, 48.955157299999996],
          name: '5 Allée Claude Chastillon, 93290 Tremblay-en-France, France',
          type: 'Point',
        },
        birthDate: '1991-01-20',
        email: 'asdasd@asdasd.com',
        gender: 'male',
        username: 'asdasd',
      },
    });
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        `/api/users`,
        { password },
        { headers: { Authorization: 'Bearer undefined' } }
      )
    );
    await findByTestId('aimedPath');
  });
});
