import React, { useState, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import Paper from '../../components/Paper';
import UserForm from '../../components/UserForm';
import Modal from '../../components/Modal';
import { useConnect } from './hooks';
import useStyles from './styles';
import messages from './messages';

const Auth = () => {
  const { login, register, forgotPassword } = useConnect();
  const classes = useStyles();
  const [tab, handleTab] = useState(0);
  const [isModalOpen, handleModal] = useState(false);
  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Grid container justify="center" className={classes.p3}>
      <Grid item className={classes.item}>
        <Paper>
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
                  onClick={() => handleModal(true)}
                  variant="outlined"
                  className={classes.mt1}
                >
                  <FormattedMessage {...messages.forgotPassword} />
                </Button>
                <Modal
                  open={isModalOpen}
                  onClose={() => handleModal(false)}
                  title={messages.forgotPassword}
                  text={messages.enterEmail}
                >
                  <UserForm initialValues={{ email: '' }} submit={forgotPassword} />
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
                isGeoActivated
              />
            )}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Auth;
