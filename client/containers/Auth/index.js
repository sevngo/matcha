import React, { useState, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  withStyles,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Paper,
  Button,
  Dialog,
  Typography,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { register, login } from '../../actions';
import * as constants from '../../utils/constants';

const styles = theme => ({
  p3: {
    padding: theme.spacing(3),
  },
  mt1: {
    marginTop: theme.spacing(1),
  },
  mt4: {
    marginTop: theme.spacing(4),
  },
  item: {
    maxWidth: 500,
  },
});

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
              <Tab label={constants.login} />
              <Tab label={constants.register} />
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
                  {constants.forgotPassword}
                </Button>
                <Dialog open={isDialogOpen} onClose={() => toggleDialog(false)}>
                  <Typography gutterBottom align="center" variant="h6" className={classes.mt4}>
                    {constants.forgotPassword}
                  </Typography>
                  <DialogContent>
                    <DialogContentText>{constants.enterEmail}</DialogContentText>
                    <UserForm initialValues={{ email: '' }} submit={console.log} />
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
                }}
                submit={register}
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
