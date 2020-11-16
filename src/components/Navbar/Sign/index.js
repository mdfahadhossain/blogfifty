/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Avatar, Box, Typography, makeStyles, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';

import Signup from './Signup';
import Signin from './Signin';
import Forgot from './Forgot';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    backgroundColor: '#cacaca',
    color: '#676767',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  title: {
    textTransform: 'capitalize',
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
}));

function Sign({ open, setOpen, auth: { loggedIn, working, error }, dispatch }) {
  const classes = useStyles();
  useEffect(() => {
    if (loggedIn) {
      setOpen('');
    }
  }, [loggedIn]);
  return (
    <div className={classes.container}>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography className={classes.title} component='h1' variant='h5'>
            {open}
          </Typography>
          {!!error && (
            <Typography component='caption' variant='caption' color='secondary'>
              {error}
            </Typography>
          )}
          {open === 'signin' && <Signin classes={classes} setOpen={setOpen} dispatch={dispatch} working={working} />}
          {open === 'signup' && <Signup classes={classes} setOpen={setOpen} dispatch={dispatch} working={working} />}
          {open === 'forgot' && <Forgot classes={classes} setOpen={setOpen} dispatch={dispatch} working={working} />}
        </div>
        <Box justifyContent='center' display='flex' mt={8}>
          Copyright © {new Date().getFullYear()}. All rights reserved BlogFifty.
        </Box>
      </Container>
    </div>
  );
}
export default connect((store) => ({ auth: store.auth }))(Sign);
