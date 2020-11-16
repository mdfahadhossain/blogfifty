import React from 'react';
import { makeStyles, Typography, Grid, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { When } from '..';

const useStyles = makeStyles({
  grid: {
    marginBottom: '20px',
    borderRadius: '5px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  card: {
    display: 'flex',
    backgroundColor: '#000a',
    color: '#fff',
  },
  cardDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '50px',
  },
  link: {
    color: 'orange',
  },
  info: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    '& > li': {
      flex: 1,
      letterSpacing: '1px',
    },
  },
});

export default ({ id, name, title, date, cover, ratings, views, user, height = 'auto', resize = false, main = false, blog = false }) => {
  const classes = useStyles();
  return (
    <Grid item md={resize ? 6 : 12} sm={12} style={{ backgroundImage: `url(${cover})`, minHeight: height }} className={classes.grid}>
      <Card className={classes.card} style={{ minHeight: height }}>
        <CardContent className={classes.cardDetails}>
          <Typography component={main ? 'h1' : 'h5'} variant={main ? 'h1' : 'h5'} className={main ? classes.title : ''}>
            {blog ? (
              title
            ) : (
              <Link to={`/${name}`} className={classes.link}>
                {title}
              </Link>
            )}
          </Typography>
          <Typography variant='caption'>
            <When date={date} />
          </Typography>
          <Typography variant='subtitle2' component='ul' className={classes.info}>
            <li title='Number of reviews'>
              Reviews: <strong>{ratings}</strong>
            </li>
            <li title='Number of views'>
              Views: <strong>{views}</strong>
            </li>
          </Typography>
          <span style={{ flex: '1 1 auto' }}></span>
          <Typography component='h5' variant='subtitle1'>
            <Link to={`/${user.username}`} className={classes.link}>
              {user.name}
            </Link>
          </Typography>
          <Typography variant='subtitle2' component='ul' className={classes.info}>
            <li title={`Ratings of ${user.name}`}>
              Rating: <strong>{user.rating}</strong>
            </li>
            <li title={`Total posts of ${user.name}`}>
              Posts: <strong>{user.posts}</strong>
            </li>
            <li title={`Rating of ${user.name}`}>
              Since: <strong>{new Date(user.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}</strong>
            </li>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
