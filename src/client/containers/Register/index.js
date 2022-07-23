import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import UserForm from '../../components/UserForm';
import { loginPath } from '../../utils';
import { initialValues } from './constants';
import { useConnect } from './hooks';
import messages from './messages';

const Register = () => {
  const { register } = useConnect();
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <Avatar
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          mb: 2,
        }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h6">
        <FormattedMessage {...messages.register} />
      </Typography>
      <Box mt={3} />
      <UserForm initialValues={initialValues} submit={register} />
      <Grid container sx={{ mt: 1 }} justifyContent="flex-end">
        <Typography variant="body2" component={Link} to={loginPath}>
          <FormattedMessage {...messages.redirectToLogin} />
        </Typography>
      </Grid>
    </Paper>
  );
};

export default Register;
