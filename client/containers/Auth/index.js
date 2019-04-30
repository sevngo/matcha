import React, { useState, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  withStyles,
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
import { register, login } from '../../actions';
import styles from './styles';
import messages from './messages';

const Auth = ({ classes, login, register }) => {
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
                    <UserForm initialValues={{ email: '' }} submit={() => {}} />
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
                  usersBlockedIds: [],
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

export default compose(
  withStyles(styles),
  connect(
    null,
    { register, login },
  ),
)(Auth);
