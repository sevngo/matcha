import React from 'react';
import { Grid, Paper } from '@mui/material';
import UserForm from '../../components/UserForm';
import { useConnect } from './hooks';
import { initialValues } from './constants';
import { usersPath } from '../../utils';
import { Navigate } from 'react-router';

const Reset = () => {
  const { isAuthEmpty, updateUser } = useConnect();
  if (!isAuthEmpty) return <Navigate to={usersPath} replace />;
  return (
    <Grid container justifyContent="center" sx={{ p: 3 }}>
      <Paper elevation={1} sx={{ p: 3, maxWidth: '30em' }}>
        <UserForm initialValues={initialValues} submit={updateUser} />
      </Paper>
    </Grid>
  );
};

export default Reset;
