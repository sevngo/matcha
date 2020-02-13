import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  AppBar,
  Tabs,
  Tab,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Paper,
} from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { useAuth } from '../../hooks';
import useStyles from './styles';

import messages from './messages';

const Auth = () => {
  const { login, register, forgotPassword } = useAuth();
  const classes = useStyles();
  const [tab, handleTab] = useState(0);
  const [isDialogOpen, handleDialog] = useState(false);
  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Box mx="auto" maxWidth={500}>
      <Paper elevation={1}>
        <AppBar position="static">
          <Tabs variant="fullWidth" value={tab} onChange={(e, tab) => handleTab(tab)}>
            <Tab label={<FormattedMessage {...messages.login} />} />
            <Tab label={<FormattedMessage {...messages.register} />} />
          </Tabs>
        </AppBar>
        <Box p={3}>
          {tab === 0 ? (
            <Box>
              <UserForm initialValues={initialValues} submit={login} />
              <Button onClick={() => handleDialog(true)} variant="outlined" className={classes.mt1}>
                <FormattedMessage {...messages.forgotPassword} />
              </Button>
              <Dialog open={isDialogOpen} onClose={() => handleDialog(false)}>
                <DialogTitle>
                  <FormattedMessage {...messages.forgotPassword} />
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <FormattedMessage {...messages.enterEmail} />
                  </DialogContentText>
                  <UserForm initialValues={{ email: '' }} submit={forgotPassword} />
                </DialogContent>
              </Dialog>
            </Box>
          ) : (
            <UserForm
              initialValues={{
                ...initialValues,
                email: '',
                gender: '',
                birthDate: '',
                address: { name: '' },
              }}
              submit={register}
              isGeoActivated
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
