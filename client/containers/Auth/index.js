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
import Dialog from '../../components/Dialog';
import { register, login } from '../../actions';
import styles from './styles';

const Component = ({ classes, login, register }) => {
  const [tab, handleTab] = useState(0);
  const [isDialogOpen, toggleDialog] = useState(false);
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
              <Tab label={<FormattedMessage id="containers.auth.login" />} />
              <Tab label={<FormattedMessage id="containers.auth.register" />} />
            </Tabs>
          </AppBar>
          <div className={classes.p3}>
            {tab === 0 ? (
              <Fragment>
                <UserForm initialValues={initialValues} submit={login} />
                <Button
                  onClick={() => toggleDialog(true)}
                  variant="outlined"
                  className={classes.mt1}
                >
                  <FormattedMessage id="containers.auth.forgotPassword" />
                </Button>
                <Dialog open={isDialogOpen} onClose={() => toggleDialog(false)}>
                  <Typography gutterBottom align="center" variant="h6">
                    <FormattedMessage id="containers.auth.forgotPassword" />
                  </Typography>
                  <DialogContent>
                    <DialogContentText>
                      <FormattedMessage id="containers.auth.enterEmail" />
                    </DialogContentText>
                    <UserForm initialValues={{ email: '' }} submit={() => {}} />
                  </DialogContent>
                </Dialog>
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

export default compose(
  withStyles(styles),
  connect(
    null,
    { register, login },
  ),
)(Component);
