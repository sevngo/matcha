import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import useStyles from './styles';
import { login, register, forgotPassword } from '../../actions';
import messages from './messages';

const Auth = () => {
  const dispatch = useDispatch();
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
              <UserForm
                initialValues={initialValues}
                submit={(values) => dispatch(login(values))}
              />
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
                  <UserForm
                    initialValues={{ email: '' }}
                    submit={(values) => dispatch(forgotPassword(values))}
                  />
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
              submit={(values) => dispatch(register(values))}
              isGeoActivated
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
