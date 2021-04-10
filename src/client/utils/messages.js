import { defineMessages } from 'react-intl';

export const formMessages = defineMessages({
  required: {
    id: 'components.input.required',
    defaultMessage: 'Required',
  },
  invalid: {
    id: 'components.input.invalid',
    defaultMessage: 'Invalid',
  },
  minLength: {
    id: 'components.input.tooShort',
    defaultMessage: 'Too short',
  },
  maxLength: {
    id: 'components.input.tooLong',
    defaultMessage: 'Too long',
  },
  tooOld: {
    id: 'components.input.tooOld',
    defaultMessage: 'Too old',
  },
  tooYoung: {
    id: 'components.input.tooYoung',
    defaultMessage: 'Too young',
  },
});
