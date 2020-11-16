import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { isvUsername, isvEmail, isvPassword } from '../../../constants/variables';
import { signin } from '../../../store/actions';
import { Spinner } from '../..';

export default ({ classes, setOpen, dispatch, working }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  function onSignin(e) {
    e.preventDefault();
    dispatch(signin(user, password));
  }
  return (
    <form onSubmit={onSignin} className={classes.form} noValidate>
      <TextField
        variant='outlined'
        margin='normal'
        type='email'
        required
        fullWidth
        label='Email Address'
        autoComplete='email'
        autoFocus
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={working || (!isvUsername(user) && !isvEmail(user)) || !isvPassword(password)}
      >
        {working ? <Spinner h='40px' /> : 'Sign In'}
      </Button>
      <Button type='button' fullWidth variant='outlined' color='secondary' className={classes.submit} disabled={working} onClick={() => setOpen('')}>
        Close
      </Button>
      <Grid container>
        <Grid item xs>
          <Link
            to={'/forgot'}
            onClick={(e) => {
              e.preventDefault();
              setOpen('forgot');
            }}
          >
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            to={'/signup'}
            onClick={(e) => {
              e.preventDefault();
              setOpen('signup');
            }}
          >
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
