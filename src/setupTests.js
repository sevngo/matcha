jest.mock('./client/socketEvents', () => ({
  emit: jest.fn(),
}));
