import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { isvEmail, isvPassword, isvName, isvUsername } from '../../../constants/variables';
import { signup } from '../../../store/actions';
import { Spinner } from '../..';

export default ({ classes, setOpen, dispatch, working }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  function onSignup(e) {
    e.preventDefault();
    dispatch(signup(name, username, email, password, cpassword));
  }
  return (
    <form onSubmit={onSignup} className={classes.form} noValidate>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Name'
        helperText='Full name, 4-32. Your name may include (,.-`).'
        autoFocus
        autoComplete='off'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Username'
        helperText='Lowercase letters and numbers, 5-16'
        autoComplete='off'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Email'
        type='email'
        autoComplete='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Password'
        helperText='Upper/Lower case letters, numbers and symbols. 8-32'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Confirm Password'
        helperText='Password must match.'
        type='password'
        value={cpassword}
        onChange={(e) => setCpassword(e.target.value)}
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={
          working ||
          !isvName ||
          !isvUsername(username) ||
          !isvEmail(email) ||
          !isvPassword(password) ||
          !isvPassword(cpassword) ||
          password !== cpassword
        }
      >
        {working ? <Spinner h='40px' /> : 'Sign Up'}
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
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
