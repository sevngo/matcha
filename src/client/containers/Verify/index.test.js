import { render, waitFor } from '@testing-library/react';
import axios from '../../api';
import withTestProviders from '../../hoc/withTestProviders';
import { usersPath, verifyPath } from '../../utils';
import Verify from './index';

jest.mock('../../api');

describe('Verify', () => {
  it('should path user then go to usersPath', async () => {
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
    const _id = '60084a46203c4e342b131140';
    const initialEntries = [`/verify/${_id}`];
    const initialPath = verifyPath(':token');
    const Component = withTestProviders(Verify, {
      initialEntries,
      initialPath,
      aimedPath: usersPath,
    });

    const { findByTestId } = render(<Component />);
    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        `/api/users`,
        { emailVerified: true },
        { headers: { Authorization: `Bearer ${_id}` } }
      )
    );
    await findByTestId('aimedPath');
  });
});
