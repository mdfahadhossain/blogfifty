import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, Container, Grid, Divider, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Featured, Sidebar, Tabs, Markdown, Spinner } from '../../components';
import { backend, authHeader } from '../../constants/variables';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

function Blog({
  match: {
    params: { name },
  },
}) {
  const classes = useStyles();
  const [featureds, setFeatureds] = useState([]);
  const [working, setWorking] = useState(true);
  const [post, setPost] = useState({});
  const [workingB, setWorkingB] = useState(true);
  useEffect(() => {
    axios
      .get(`${backend()}/post/${name}`, { headers: authHeader() })
      .then(({ data }) => {
        setPost(data);
        setWorking(false);

        axios
          .get(`${backend()}/post/related?exception=${name}`)
          .then(({ data }) => {
            setFeatureds(data);
            setWorkingB(false);
          })
          .catch(() => {
            setWorkingB(false);
          });
      })
      .catch(() => {
        setWorking(false);
      });
  }, [name]);
  if (working) {
    return <Spinner h={80} />;
  } else {
    return (
      <Fragment>
        <Container maxWidth='lg'>
          <Tabs />
          <Featured {...post} height='250px' main={true} blog={true} />
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <Markdown>{post.content}</Markdown>
            </Grid>
            <Sidebar />
          </Grid>
        </Container>
        <Divider style={{ backgroundColor: '#f50057', margin: '60px 0' }} />
        <Container maxWidth='lg'>
          <Typography component='h3' variant='h5' style={{ marginBottom: '40px' }}>
            You may also like
          </Typography>
          {workingB ? (
            <Spinner h={10} />
          ) : (
            <Grid container spacing={1}>
              {featureds.map((post, i) => (
                <Featured key={i} {...post} height='15px' resize={true} />
              ))}
            </Grid>
          )}
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(Blog);
