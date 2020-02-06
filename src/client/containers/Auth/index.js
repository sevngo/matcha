import React, { useState, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Tabs, Tab, Button, Box } from '@material-ui/core';
import Paper from '../../components/Paper';
import UserForm from '../../components/UserForm';
import Modal from '../../components/Modal';
import { useAuth } from '../../hooks';
import useStyles from './styles';

import messages from './messages';

const Auth = () => {
  const { login, register, forgotPassword } = useAuth();
  const classes = useStyles();
  const [tab, handleTab] = useState(0);
  const [isModalOpen, handleModal] = useState(false);
  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Box mx="auto" maxWidth={500}>
      <Paper>
        <AppBar position="static">
          <Tabs variant="fullWidth" value={tab} onChange={(e, tab) => handleTab(tab)}>
            <Tab label={<FormattedMessage {...messages.login} />} />
            <Tab label={<FormattedMessage {...messages.register} />} />
          </Tabs>
        </AppBar>
        <Box p={3}>
          {tab === 0 ? (
            <Fragment>
              <UserForm initialValues={initialValues} submit={login} />
              <Button onClick={() => handleModal(true)} variant="outlined" className={classes.mt1}>
                <FormattedMessage {...messages.forgotPassword} />
              </Button>
              <Modal
                open={isModalOpen}
                onClose={() => handleModal(false)}
                title={<FormattedMessage {...messages.forgotPassword} />}
                text={<FormattedMessage {...messages.enterEmail} />}
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
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
