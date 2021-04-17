import { io } from 'socket.io-client';

const ioUrl =
  process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : null;

const socket = io(ioUrl);

export default socket;
