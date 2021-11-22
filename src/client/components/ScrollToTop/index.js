import { Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';

const ScrollToTop = () => {
  const classes = useStyles();
  const [visible, handleVisible] = useState(false);
  const onScroll = () =>
    handleVisible(document.documentElement.scrollTop > 150);
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!visible) return false;
  return (
    <Fab
      color="primary"
      size="medium"
      className={classes.fab}
      onClick={scrollToTop}
    >
      <NavigationIcon color="inherit" />
    </Fab>
  );
};

export default ScrollToTop;
