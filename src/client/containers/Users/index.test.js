import '@testing-library/jest-dom';
import axios from '../../api';
import { fireEvent, render } from '@testing-library/react';
import withTestProviders from '../../hoc/withTestProviders';
import Users from './index';

jest.mock('../../api');

describe('Users', () => {
  const users = [
    {
      _id: '60084a46203c4e342b13114c',
      username: 'Shanie21',
      birthDate: '1998-03-03T13:43:52.868Z',
      gender: 'male',
      address: {
        name: '247 Bert Village',
      },
      distance: 2640.691228895585,
    },
    {
      _id: '60084a46203c4e342b13113c',
      username: 'Brianne82',
      birthDate: '1990-05-11T19:00:30.586Z',
      gender: 'male',
      address: {
        name: '4860 Berenice Lodge',
      },
      distance: 2993.4424127582033,
    },
    {
      _id: '60084a46203c4e342b131140',
      username: 'Jon3',
      birthDate: '1973-05-08T21:14:45.718Z',
      gender: 'male',
      address: {
        name: '259 Fabiola Station',
      },
      distance: 6966.4502984182745,
    },
    {
      _id: '60084a46203c4e342b131139',
      username: 'Joannie_Corkery92',
      birthDate: '1998-09-22T09:23:53.485Z',
      gender: 'male',
      address: {
        name: '2431 Marisol Park',
      },
      distance: 9156.496213903085,
    },
    {
      _id: '60084a46203c4e342b13113a',
      username: 'Lilly.MacGyver',
      birthDate: '2002-05-18T07:47:56.337Z',
      gender: 'male',
      address: {
        name: '27384 Carroll Rue',
      },
      distance: 10229.485636305038,
    },
    {
      _id: '60084a46203c4e342b131143',
      username: 'Lacy_Harber23',
      birthDate: '2001-11-18T21:39:20.224Z',
      gender: 'male',
      address: {
        name: '1810 Eliseo Key',
      },
      distance: 11798.426998259116,
    },
    {
      _id: '60084a46203c4e342b131147',
      username: 'Sophie.Gorczany',
      birthDate: '1992-08-23T18:55:03.359Z',
      gender: 'male',
      address: {
        name: '149 Koch Vista',
      },
      distance: 13149.980680446492,
    },
    {
      _id: '60084a46203c4e342b131142',
      username: 'Joelle.Weissnat',
      birthDate: '1985-02-24T06:13:19.138Z',
      gender: 'male',
      address: {
        name: '74795 Howe Inlet',
      },
      distance: 16796.075505426317,
    },
    {
      _id: '60084a46203c4e342b131152',
      username: 'Joelle.Weissnat',
      birthDate: '1985-02-24T06:13:19.138Z',
      gender: 'male',
      address: {
        name: '74795 Howe Inlet',
      },
      distance: 16796.075505426317,
    },
    {
      _id: '60081a46203c4e342b131162',
      username: 'Henry.Ssnat',
      birthDate: '1985-02-24T06:13:19.138Z',
      gender: 'male',
      address: {
        name: '74795 Howe Inlet',
      },
      distance: 11796.075505426317,
    },
    {
      _id: '60082a46203c4e342b131172',
      username: 'Mathieu.Be',
      birthDate: '1985-02-24T06:13:19.138Z',
      gender: 'male',
      address: {
        name: '74795 Howe Inlet',
      },
      distance: 16196.075505426317,
    },
    {
      _id: '60034a46203c4e342b131182',
      username: 'Venden.Lol',
      birthDate: '1985-02-24T06:13:19.138Z',
      gender: 'male',
      address: {
        name: '74795 Howe Inlet',
      },
      distance: 18796.075505426317,
    },
  ];
  const total = 11;

  it('should load users then open drawer', async () => {
    const initialState = {
      users: {
        filter: {
          gender: 'male',
          maxDistance: 20000,
          ageRange: [18, 80],
          sortBy: 'distance:asc',
          limit: 10,
          skip: 0,
        },
      },
    };
    axios.get.mockResolvedValue({
      data: users,
      headers: { 'x-total-count': total },
    });
    const Component = withTestProviders(Users, { initialState });

    const { getByTestId, queryByTestId, findByTestId } = render(<Component />);
    expect(axios.get).toHaveBeenCalled();
    await findByTestId('users');

    expect(queryByTestId('drawer')).not.toBeInTheDocument();
    fireEvent.click(getByTestId('openDrawer'));
    getByTestId('drawer');
  });

  it('should load users then change page and rows', async () => {
    const initialState = {
      users: {
        filter: {
          gender: 'male',
          maxDistance: 20000,
          ageRange: [18, 80],
          sortBy: 'distance:asc',
          limit: 10,
          skip: 0,
        },
      },
    };
    axios.get.mockResolvedValue({
      data: users,
      headers: { 'x-total-count': total },
    });

    const Component = withTestProviders(Users, { initialState });
    const { findByTestId, getByRole, getByText } = render(<Component />);
    expect(axios.get).toHaveBeenCalled();
    await findByTestId('users');

    getByText('1-10 of 11');
    fireEvent.click(getByRole('button', { name: 'Next page' }));
    getByText('11-11 of 11');

    getByRole('button', { name: 'Rows per page: 10' });
    fireEvent.mouseDown(getByRole('button', { name: 'Rows per page: 10' }));
    fireEvent.click(getByRole('option', { name: '25' }));
    getByRole('button', { name: 'Rows per page: 25' });
  });
});
