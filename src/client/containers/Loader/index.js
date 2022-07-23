import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { getLoading } from '../../store/loading/selectors';

const Loader = () => {
  const isLoading = useSelector(getLoading);
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff',
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
