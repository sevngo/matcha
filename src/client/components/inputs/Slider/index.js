import { Box, FormLabel, Slider as MSlider } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
import useStyles from './styles';

const Slider = ({ control, name, label, rules, ...rest }) => {
  const classes = useStyles();
  const {
    field: { onChange, ...fields },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Box mt={9 / 2} />
      <MSlider
        className={classes.m1}
        {...fields}
        {...rest}
        onChange={(_, value) => onChange(value)}
      />
    </Box>
  );
};

export default Slider;
