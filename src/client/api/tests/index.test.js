import instance from '../';
import { getAuthToken } from '../../selectors/auth';
import * as authActions from '../../actions/auth';
import * as snackbarActions from '../../actions/snackbar';
import nock from 'nock';

jest.mock('../../selectors/auth', () => ({
  getAuthToken: jest.fn(),
  getAuth: jest.fn(),
}));

describe('api | index', () => {
  it('should not set Authorization header', async () => {
    const url = 'http://localhost';
    const route = '/repos/atom/atom/license';
    nock(url).get(route).reply(200);
    const {
      config: {
        headers: { Authorization },
      },
    } = await instance.get(`${url}${route}`);
    expect(Authorization).not.toBeDefined();
  });

  it('should set Authorization header', async () => {
    const url = 'http://localhost';
    const route = '/repos/atom/atom/license';
    const token = 'FAKE_TOKEN';
    nock(url).get(route).reply(200);
    getAuthToken.mockReturnValueOnce(token);
    const {
      config: {
        headers: { Authorization },
      },
    } = await instance.get(`${url}${route}`);
    expect(Authorization).toBe(`Bearer ${token}`);
  });

  it('should dispatch openSnackbar', async () => {
    const url = 'http://localhost';
    const route = '/repos/atom/atom/license';
    nock(url).get(route).reply(400);
    const spy = jest.spyOn(snackbarActions, 'openSnackbar');
    try {
      await instance.get(`${url}${route}`);
    } catch {
    } finally {
      expect(spy).toHaveBeenCalled();
    }
  });

  it('should dispatch logout', async () => {
    const url = 'http://localhost';
    const route = '/repos/atom/atom/license';
    nock(url).get(route).reply(401);
    const spy = jest.spyOn(authActions, 'logout');
    try {
      await instance.get(`${url}${route}`);
    } catch {
    } finally {
      expect(spy).toHaveBeenCalled();
    }
  });
});
