import React, { useState, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  AppBar,
  Tabs,
  Tab,
  Paper,
  Button,
  Typography,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Modal from '../../components/Modal';
import { useMyDispatch } from '../../hooks';
import useStyles from './styles';
import messages from './messages';

const Auth = () => {
  const { login, register, forgotPassword } = useMyDispatch();
  const classes = useStyles();
  const [tab, handleTab] = useState(0);
  const [isModalOpen, toggleModal] = useState(false);
  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Grid container justify="center" className={classes.p3}>
      <Grid item className={classes.item}>
        <Paper elevation={24}>
          <AppBar position="static">
            <Tabs variant="fullWidth" value={tab} onChange={(e, tab) => handleTab(tab)}>
              <Tab label={<FormattedMessage {...messages.login} />} />
              <Tab label={<FormattedMessage {...messages.register} />} />
            </Tabs>
          </AppBar>
          <div className={classes.p3}>
            {tab === 0 ? (
              <Fragment>
                <UserForm initialValues={initialValues} submit={login} />
                <Button
                  onClick={() => toggleModal(true)}
                  variant="outlined"
                  className={classes.mt1}
                >
                  <FormattedMessage {...messages.forgotPassword} />
                </Button>
                <Modal open={isModalOpen} onClose={() => toggleModal(false)}>
                  <Typography gutterBottom align="center" variant="h6">
                    <FormattedMessage {...messages.forgotPassword} />
                  </Typography>
                  <DialogContent>
                    <DialogContentText>
                      <FormattedMessage {...messages.enterEmail} />
                    </DialogContentText>
                    <UserForm initialValues={{ email: '' }} submit={forgotPassword} />
                  </DialogContent>
                </Modal>
              </Fragment>
            ) : (
              <UserForm
                initialValues={{
                  ...initialValues,
                  email: '',
                  firstName: '',
                  lastName: '',
                  gender: '',
                  birthDate: '',
                  address: { name: '' },
                }}
                submit={register}
                withGeolocation
              />
            )}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Auth;
