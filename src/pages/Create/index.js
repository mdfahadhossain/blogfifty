/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Divider, Typography, Button, ButtonBase, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Check, Info } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { backend, authHeader } from '../../constants/variables';
import { Categories } from '../../constants/categories';
import { Markdown, Spinner } from '../../components';
import BlogImg from '../../assets/images/blog.png';
import useStyles from './style';

function Create({ auth: { loggedIn }, history }) {
  const classes = useStyles();
  const [working, setWorking] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  function onPublish() {
    setWorking(true);
    const data = new FormData();
    data.append('cover', image);
    data.append('category', category);
    data.append('title', title.trim());
    data.append('url', url.trim());
    data.append('body', body.trim());
    data.append('date', new Date().toISOString());
    axios
      .post(`${backend()}/post`, data, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
      .then(({ data }) => {
        setWorking(false);
        setImage(null);
        setCategory('');
        setTitle('');
        setUrl('');
        setBody('');
        setError('');
        history.push(`/${data}`);
      })
      .catch(({ response: { data } }) => {
        setError(data.message);
        setWorking(false);
      });
  }
  useEffect(() => {
    if (!loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);
  return (
    <Container className={classes.container}>
      {!!error && (
        <Typography component='h5' variant='subtitle1' color='secondary'>
          {error}
        </Typography>
      )}
      <Grid container className={classes.root} style={{ alignItems: 'center' }}>
        <Grid md={4} sm={12} item>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: '100%',
            }}
            onClick={() => {
              document.getElementById('coverImage').click();
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${!!image ? URL.createObjectURL(image) : BlogImg})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography component='span' variant='subtitle1' color='inherit' className={classes.imageTitle}>
                Upload Cover Photo
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
          <input
            hidden
            type='file'
            id='coverImage'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files[0];
              if (['png', 'jpeg', 'jpg'].includes(file.type.split('/')[1])) {
                setImage(file);
              }
            }}
          />
        </Grid>
        <Grid md={8} sm={12} item style={{ padding: '0 2%' }}>
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <InputLabel id='category'>Category</InputLabel>
            <Select fullWidth labelId='category' value={category} onChange={(e) => setCategory(e.target.value)}>
              {Categories.map(({ name }, i) => (
                <MenuItem key={i} value={name} style={{ textTransform: 'capitalize' }}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item style={{ flex: 1 }}>
              <TextField
                fullWidth
                label='Post title'
                value={title}
                onChange={(e) => {
                  const t = e.target.value;
                  setTitle(t);
                  setUrl(t.trim().toLocaleLowerCase().split(' ').join('-'));
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>{false ? <Check color='primary' /> : <Info color='error' />}</Grid>
            <Grid item style={{ flex: 1 }}>
              <TextField fullWidth label='Post url' value={url} onChange={(e) => setUrl(e.target.value)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.root}>
        <Grid md={12} item>
          <TextField
            fullWidth
            multiline
            rows={20}
            label='Post Body <Markdown and Text>'
            variant='outlined'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.root}>
        <Typography component='h2' variant='h4'>
          Post Preview:
        </Typography>
        <Grid md={12} item>
          <Divider style={{ color: '#f50057', height: '3px' }} />
          <div style={{ minHeight: '100px', backgroundColor: '#fff', padding: '5px' }}>
            <Markdown>{body}</Markdown>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems='flex-end' className={classes.root}>
        <Button
          variant='contained'
          color='primary'
          size='small'
          disabled={working || !image || !title || !body || !url || !category}
          onClick={onPublish}
        >
          {working ? <Spinner h='40px' /> : 'Publish'}
        </Button>
      </Grid>
    </Container>
  );
}

export default connect((store) => ({ auth: store.auth }))(withRouter(Create));
