import React, { useState } from 'react';
import { Toolbar, Typography, IconButton, makeStyles, Paper, InputBase, Divider, createStyles, Avatar, Button } from '@material-ui/core';
import { Search, Close, Menu, ArrowDropDown, Notifications, ArrowDropUp, AddRounded, Person } from '@material-ui/icons';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions';
import Notification from './Notification';
import Options from './Options';
import store from '../../store';
import Sign from './Sign';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    toolbar: {
      borderBottom: `1px solid #f50057`,
      '& > a, & > button': {
        margin: '0 10px',
      },
    },
    toolbarTitle: {
      '& > a': {
        color: '#f50057',
      },
    },
    grid: {
      maxWidth: '400px',
    },
  })
);

function Navbar({ auth: { loggedIn }, history }) {
  const classes = useStyles();
  const [openSign, setOpenSign] = useState(false);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState(false);
  const [optMenu, setOptMenu] = useState(null);
  const [notMenu, setNotMenu] = useState(null);
  function onLogout() {
    store.dispatch(logout());
    setOpenSign('');
    setOptMenu(null);
  }
  function onSearch(e) {
    e.preventDefault();
    const query = input.trim().split(' ').join('+');
    if (!!query) {
      history.push(`/?query=${query}`);
    }
  }
  return (
    <Toolbar className={classes.toolbar}>
      <Typography component='h2' variant='h5' color='secondary' align='left' noWrap className={classes.toolbarTitle}>
        <NavLink to='/'>BlogFifty</NavLink>
      </Typography>
      <span style={{ flex: '1 1 auto' }}></span>
      {search ? (
        <Paper component='form' className={classes.root} onSubmit={onSearch}>
          <IconButton type='button' className={classes.iconButton}>
            <Menu />
          </IconButton>
          <InputBase className={classes.input} placeholder='Search' value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton type='submit' className={classes.iconButton} aria-label='search'>
            <Search />
          </IconButton>
          <Divider className={classes.divider} orientation='vertical' />
          <IconButton
            type='button'
            onClick={() => {
              setSearch(false);
              setInput('');
            }}
            color='secondary'
            className={classes.iconButton}
          >
            <Close />
          </IconButton>
        </Paper>
      ) : (
        <IconButton title='Search' color='secondary' onClick={() => setSearch(true)}>
          <Avatar>
            <Search color='secondary' />
          </Avatar>
        </IconButton>
      )}
      {!loggedIn && (
        <>
          <Button
            variant='outlined'
            size='small'
            color='secondary'
            onClick={(e) => {
              setOpenSign('signin');
            }}
          >
            Signin
          </Button>
          <Button
            variant='outlined'
            size='small'
            color='secondary'
            onClick={(e) => {
              setOpenSign('signup');
            }}
          >
            Signup
          </Button>
        </>
      )}
      {loggedIn && (
        <>
          <NavLink to='/create'>
            <Avatar>
              <AddRounded color='secondary' />
            </Avatar>
          </NavLink>
          <NavLink
            to='/notifications'
            onClick={(e) => {
              e.preventDefault();
              setNotMenu(e.currentTarget);
            }}
          >
            <Avatar>
              <Notifications color='secondary' />
            </Avatar>
          </NavLink>
          <NavLink to='/profile'>
            <Avatar>
              <Person color='secondary' />
            </Avatar>
          </NavLink>
          <IconButton color='secondary' onClick={(e) => setOptMenu(e.currentTarget)}>
            <Avatar>{!!optMenu ? <ArrowDropUp color='secondary' /> : <ArrowDropDown color='secondary' />}</Avatar>
          </IconButton>
          <Options anchorEl={optMenu} setAnchorEl={setOptMenu} onLogout={onLogout} />
          <Notification anchorEl={notMenu} setAnchorEl={setNotMenu} />
        </>
      )}
      {!!openSign && !loggedIn && <Sign open={openSign} setOpen={setOpenSign} />}
    </Toolbar>
  );
}
export default connect((store) => ({ auth: store.auth }))(withRouter(Navbar));
