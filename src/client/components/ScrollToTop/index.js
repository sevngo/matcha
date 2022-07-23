import { Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
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
      sx={{
        position: 'fixed',
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
      }}
      color="primary"
      size="medium"
      // className={classes.fab}
      onClick={scrollToTop}
    >
      <NavigationIcon color="inherit" />
    </Fab>
  );
};

export default ScrollToTop;
