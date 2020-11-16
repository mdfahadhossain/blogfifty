/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  ButtonBase,
  Tabs,
  Tab,
  Box,
  Toolbar,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  CardHeader,
  Switch,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { backend, authHeader, isvName, isvPassword } from '../../constants/variables';
import avatar1 from '../../assets/images/avatar.png';
import { Dialog, Spinner } from '../../components';
import { logout, setAuth } from '../../store/actions';
import useStyles from './style';

function Profile({ auth: { name, username, email, avatar, loggedIn }, dispatch, history }) {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [passwordInput, setPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [working, setWorking] = useState(false);
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  function onEditName() {
    const n = nameInput.trim();
    setWorking(true);
    axios
      .put(`${backend()}/profile/${username}/name`, { name: n }, { headers: authHeader() })
      .then(() => {
        setWorking(false);
        setEditName(false);
        dispatch(setAuth({ name: n }));
        setNameInput('');
      })
      .catch(() => setWorking(false));
  }
  function onChangePW() {
    setWorking(true);
    axios
      .put(
        `${backend()}/profile/${username}/password`,
        { oldPass: passwordInput, password: newPasswordInput, cpassword: confirmPassword },
        { headers: authHeader() }
      )
      .then(() => {
        setWorking(false);
        setPasswordInput('');
        setNewPasswordInput('');
        setConfirmPassword('');
      })
      .catch(() => setWorking(false));
  }
  function onDelete() {
    setWorking(true);
    axios
      .delete(`${backend()}/profile/${username}`, { headers: authHeader() })
      .then(() => {
        setWorking(false);
        dispatch(logout());
        history.push('/');
      })
      .catch(() => setWorking(false));
  }
  useEffect(() => {
    if (!loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);
  return (
    <Container>
      <Grid container>
        <Grid sm={4} item style={{ height: 'calc(100vh - 65px)', borderRight: '1px solid #2a2a2a' }}>
          <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible}>
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${avatar || avatar1})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography component='span' variant='subtitle1' color='inherit' className={classes.imageTitle}>
                <Edit />
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
          <Typography component='h1' variant='h4' align='center'>
            {name}
          </Typography>
          <Typography component='h4' variant='subtitle1' align='center'>
            ({username})
          </Typography>
          <Tabs
            orientation='vertical'
            variant='scrollable'
            value={tab}
            onChange={(e, i) => setTab(i)}
            aria-label='Vertical tabs example'
            className={classes.tabs}
          >
            <Tab label='Name' {...a11yProps(0)} />
            <Tab label='Password' {...a11yProps(1)} />
            <Tab label='Notifications' {...a11yProps(2)} />
            <Tab label='Email' {...a11yProps(3)} />
            <Tab label='Account' {...a11yProps(4)} />
          </Tabs>
        </Grid>
        <Grid sm={8} item>
          <TabPanel value={tab} index={0}>
            <Toolbar>
              <Typography align='center' component='h1' variant='h5'>
                Name
              </Typography>
            </Toolbar>
            <Card style={{ padding: '10% 10px', margin: '10% 0' }}>
              <CardHeader title='Change name' />
              <CardContent>
                {editName ? (
                  <TextField
                    margin='normal'
                    variant='outlined'
                    fullWidth
                    label='Name'
                    helperText='Full name, 4-32. Your name may include (,.-`).'
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                ) : (
                  <Typography component='p' variant='subtitle1'>
                    {name}
                  </Typography>
                )}
              </CardContent>
              {editName ? (
                <>
                  <Button size='small' variant='contained' color='primary' onClick={onEditName} disabled={working || !isvName(nameInput)}>
                    {working ? <Spinner h='40px' /> : 'Save'}
                  </Button>
                  <Button size='small' variant='contained' color='secondary' onClick={() => setEditName(false)} disabled={working}>
                    Cancel
                  </Button>
                </>
              ) : (
                <IconButton color='primary' onClick={() => setEditName(true)}>
                  <Edit />
                </IconButton>
              )}
            </Card>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Toolbar>
              <Typography align='center' component='h1' variant='h5'>
                Change password
              </Typography>
            </Toolbar>
            <Card style={{ padding: '10% 10px', margin: '10% 0' }}>
              <CardHeader title='Change account password' />
              <CardContent>
                <TextField
                  type='password'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  label='Old password'
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <TextField
                  type='password'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  label='New password'
                  helperText='Upper/Lower case letters, numbers and symbols. 8-32'
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                />
                <TextField
                  type='password'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  label='Confirm password'
                  helperText='Password must match.'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </CardContent>
              <Button
                size='small'
                variant='contained'
                color='primary'
                onClick={onChangePW}
                disabled={working || !isvPassword(passwordInput) || !isvPassword(newPasswordInput) || !isvPassword(confirmPassword)}
              >
                {working ? <Spinner h='40px' /> : 'Change'}
              </Button>
            </Card>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Toolbar>
              <Typography align='center' component='h1' variant='h5'>
                Notifications
              </Typography>
            </Toolbar>
            <Card style={{ padding: '10% 10px', margin: '10% 0' }}>
              <CardHeader title='Get notified once a new post come.' />
              <CardContent>
                <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <Toolbar>
              <Typography align='center' component='h1' variant='h5'>
                Email
              </Typography>
            </Toolbar>
            <Card style={{ padding: '10% 10px', margin: '10% 0' }}>
              <CardHeader title='Primary email.' />
              <CardContent>
                <Typography component='h3' variant='subtitle1'>
                  {email}
                </Typography>
                <Typography component='p' variant='caption'>
                  You cannot change your primary email.
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={tab} index={4}>
            <Toolbar>
              <Typography align='center' component='h1' variant='h5'>
                Account
              </Typography>
            </Toolbar>
            <Dialog
              open={openDelete}
              close={() => setOpenDelete(false)}
              title='Delete Account'
              body='Be sure that you will not be able to recover your account once you delete it.'
              action={onDelete}
              btn='Delete'
            />
            <Card style={{ padding: '10% 10px', margin: '10% 0' }}>
              <CardHeader title='Delete account.' />
              <CardContent>
                <Typography component='p' variant='subtitle1'>
                  Delete your account permanently. All your post data will be deleted.
                </Typography>
              </CardContent>
              <Button variant='contained' color='secondary' startIcon={<Delete />} onClick={() => setOpenDelete(true)} disabled={working}>
                {working ? <Spinner h='40px' /> : 'Delete Account'}
              </Button>
            </Card>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role='tabpanel' hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

export default connect((store) => ({ auth: store.auth }))(withRouter(Profile));
