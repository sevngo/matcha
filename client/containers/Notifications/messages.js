import { defineMessages } from 'react-intl';

export default defineMessages({
  friendLogged: {
    id: 'containers.notifications.friendLogged',
    defaultMessage: '{username} has logged in',
  },
  gotLiked: {
    id: 'containers.notifications.gotLiked',
    defaultMessage: '{username} has liked you',
  },
  gotBlocked: {
    id: 'containers.notifications.gotBlocked',
    defaultMessage: '{username} has blocked you',
  },
  gotFriended: {
    id: 'containers.notifications.gotFriended',
    defaultMessage: '{username} is your new friend',
  },
  gotUnfriended: {
    id: 'containers.notifications.gotUnfriended',
    defaultMessage: '{username} is not your friend anymore',
  },
  gotVisited: {
    id: 'containers.notifications.gotVisited',
    defaultMessage: '{username} has visited your profile',
  },
});
