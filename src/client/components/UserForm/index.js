import { Box, Button, Grid, IconButton, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ClearIcon from '@mui/icons-material/Clear';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import moment from 'moment';
import { has, map, __ } from 'ramda';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useAutocomplete, useGeolocation } from '../../hooks/googleMaps';
import { isEmail, isTrimmed } from '../../utils';
import Input from '../inputs/Input';
import Radio from '../inputs/Radio';
import Select from '../inputs/Select';
import Slider from '../inputs/Slider';
import { GENDER_OPTIONS, SORT_BY_OPTIONS } from './constants';
import messages from './messages';

const UserForm = ({ initialValues, readOnly = false, submit, id }) => {
  const [showPassword, toggleShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
    control,
    setValue,
    reset,
    trigger,
  } = useForm({
    defaultValues: initialValues,
    mode: 'onTouched',
  });
  const hasInitialValue = has(__, initialValues);
  const coordinates = watch('address.coordinates');
  if (initialValues.address) {
    register('address.coordinates', { required: true });
  }
  const handleAddress = useCallback(
    (address) => {
      setValue('address.name', address.name);
      setValue('address.type', address.type);
      setValue('address.coordinates', address.coordinates);
      trigger('address.coordinates');
    },
    [setValue, trigger]
  );
  const getGeolocation = useGeolocation(handleAddress);
  useAutocomplete(
    'address.name',
    handleAddress,
    hasInitialValue('address') && !readOnly
  );
  const minDate = moment().subtract(80, 'years').format('YYYY-MM-DD');
  const maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  return (
    <Box
      component="form"
      sx={{ width: '100%' }}
      onSubmit={handleSubmit(async (values) => {
        await submit(values);
        reset(values);
      })}
    >
      <Grid container direction="column" spacing={2}>
        {hasInitialValue('username') && (
          <Grid item>
            <Input
              name="username"
              control={control}
              inputProps={{ 'data-testid': 'usernameInput' }}
              label={<FormattedMessage {...messages.username} />}
              autoComplete="username"
              readOnly={readOnly}
              rules={{
                required: true,
                minLength: 4,
                maxLength: 40,
                validate: {
                  invalid: isTrimmed,
                },
              }}
              startAdornment={<AccountCircleIcon />}
            />
          </Grid>
        )}
        {hasInitialValue('password') && (
          <Grid item>
            <Input
              name="password"
              control={control}
              rules={{
                required: true,
                minLength: 4,
                maxLength: 40,
                validate: {
                  invalid: isTrimmed,
                },
              }}
              inputProps={{ 'data-testid': 'passwordInput' }}
              label={<FormattedMessage {...messages.password} />}
              autoComplete="password"
              type={showPassword ? 'text' : 'password'}
              startAdornment={<VpnKeyIcon />}
              endAdornment={{
                icon: showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />,
                action: () => toggleShowPassword(!showPassword),
              }}
            />
          </Grid>
        )}
        {hasInitialValue('email') && (
          <Grid item>
            <Input
              name="email"
              control={control}
              rules={{
                required: true,
                maxLength: 40,
                validate: {
                  invalid: isEmail,
                },
              }}
              inputProps={{ 'data-testid': 'emailInput' }}
              label={<FormattedMessage {...messages.email} />}
              autoComplete="email"
              startAdornment={<AlternateEmailIcon />}
              readOnly={readOnly}
            />
          </Grid>
        )}
        {hasInitialValue('birthDate') && (
          <Grid item>
            <Input
              name="birthDate"
              control={control}
              rules={{ required: true }}
              type="date"
              min={minDate}
              max={maxDate}
              inputProps={{ 'data-testid': 'birthDateInput' }}
              label={<FormattedMessage {...messages.birthDate} />}
              startAdornment={<DateRangeIcon />}
              readOnly={readOnly}
            />
          </Grid>
        )}
        {hasInitialValue('gender') && (
          <Grid item>
            <Radio
              name="gender"
              control={control}
              rules={{ required: true }}
              label={<FormattedMessage {...messages.gender} />}
              options={GENDER_OPTIONS}
              messages={messages}
              readOnly={readOnly}
            />
          </Grid>
        )}
        {hasInitialValue('address') && (
          <Grid
            item
            container
            direction="row"
            alignItems="flex-start"
            style={{ flexWrap: 'nowrap' }}
          >
            <Input
              name="address.name"
              control={control}
              label={<FormattedMessage {...messages.address} />}
              otherError={errors.address?.coordinates?.type}
              readOnly={readOnly || Boolean(coordinates)}
            />
            <Box marginTop={5} />
            {coordinates && !readOnly && (
              <IconButton
                onClick={() => handleAddress({ name: '', coordinates: null })}
                sx={{ pt: 1.875 }}
                data-testid="clearAddress"
                size="large"
              >
                <ClearIcon />
              </IconButton>
            )}
            {!coordinates && !readOnly && (
              <IconButton
                onClick={getGeolocation}
                sx={{ pt: 1.875 }}
                data-testid="geolocate"
                size="large"
              >
                <MyLocationIcon />
              </IconButton>
            )}
          </Grid>
        )}
        {hasInitialValue('ageRange') && (
          <Grid item>
            <Slider
              name="ageRange"
              control={control}
              label={<FormattedMessage {...messages.ageRange} />}
              min={18}
              max={80}
              valueLabelDisplay="on"
            />
          </Grid>
        )}
        {hasInitialValue('maxDistance') && (
          <Grid item>
            <Input
              name="maxDistance"
              control={control}
              label={<FormattedMessage {...messages.maxDistance} />}
              type="number"
              rules={{ required: true }}
              InputProps={{
                endAdornment: <FormattedMessage {...messages.unitDistance} />,
              }}
            />
          </Grid>
        )}
        {hasInitialValue('sortBy') && (
          <Grid item>
            <Select
              name="sortBy"
              control={control}
              label={<FormattedMessage {...messages.sortBy} />}
            >
              {map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  <FormattedMessage {...messages[option.id]} />
                </MenuItem>
              ))(SORT_BY_OPTIONS)}
            </Select>
          </Grid>
        )}
        {!readOnly && (
          <Grid item>
            <Button
              data-testid={`submitForm-${id}`}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!isDirty}
              fullWidth
            >
              <FormattedMessage {...messages.submit} />
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default React.memo(UserForm);
