jest.mock('./client/socketEvents', () =>
  jest.fn(() => ({
    emit: jest.fn(),
  }))
);
