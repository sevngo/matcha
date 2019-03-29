module.exports = {
  hooks: {
    'pre-commit': 'pretty-quick --staged && eslint client server',
  },
};
