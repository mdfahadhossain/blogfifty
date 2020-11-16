import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { isvEmail, isvUsername } from '../../../constants/variables';
import { forgot } from '../../../store/actions';
import { Spinner } from '../..';

export default ({ classes, setOpen, dispatch, working }) => {
  const [user, setUser] = useState('');
  function onForgot(e) {
    e.preventDefault();
    dispatch(forgot(user));
  }
  return (
    <form onSubmit={onForgot} className={classes.form} noValidate>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Email or Username'
        autoComplete='off'
        autoFocus
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={working || !isvEmail(user) || !isvUsername(user)}
      >
        {working ? <Spinner h='40px' /> : 'Reset'}
      </Button>
      <Button type='button' fullWidth variant='outlined' color='secondary' className={classes.submit} disabled={working} onClick={() => setOpen('')}>
        Close
      </Button>
      <Grid container justify='flex-end'>
        <Grid item>
          <Link
            to={'/signin'}
            onClick={(e) => {
              e.preventDefault();
              setOpen('signin');
            }}
          >
            Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
