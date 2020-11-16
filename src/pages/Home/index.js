import React, { useEffect, useState } from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Featured, Sidebar, Tabs, Spinner } from '../../components';
import { queryString } from '../../constants/functions';
import { backend } from '../../constants/variables';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

function Home({ location: { search } }) {
  const classes = useStyles();
  const query = queryString(search)?.query || '';
  // const name = queryString(search)?.name || '';
  const [featured, setFeatured] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [workingF, setWorkingF] = useState(true);
  const [workingB, setWorkingB] = useState(true);
  useEffect(() => {
    axios
      .get(`${backend()}/post/featured`)
      .then(({ data }) => {
        setFeatured(data);
        setWorkingF(false);
      })
      .catch(() => {
        setWorkingF(false);
      });
    // const q = ''
    axios
      .get(`${backend()}/post`)
      .then(({ data }) => {
        setBlogs(data);
        setWorkingB(false);
      })
      .catch(() => {
        setWorkingB(false);
      });
  }, [search]);
  return (
    <Container maxWidth='lg'>
      <Tabs query={query} />
      {!workingF ? <Featured {...featured} height='250px' main={true} /> : <Spinner h={20} />}
      <Grid container spacing={5} className={classes.mainGrid}>
        {!workingB ? (
          <Grid item xs={12} md={8}>
            {blogs.map((blog, i) => (
              <Featured key={i} {...blog} height='150px' />
            ))}
          </Grid>
        ) : (
          <div style={{ flex: 1 }}>
            <Spinner h={40} />
          </div>
        )}
        <Sidebar />
      </Grid>
    </Container>
  );
}

export default withRouter(Home);
