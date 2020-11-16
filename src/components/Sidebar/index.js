import React from 'react';
import { makeStyles, Grid, Paper, Typography, Link } from '@material-ui/core';
import { Twitter, Facebook } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  about: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  section: {
    marginTop: theme.spacing(3),
  },
}));

const sidebar = {
  title: 'Blogger',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'Twitter', Icon: Twitter },
    { name: 'Facebook', Icon: Facebook },
  ],
};

export default () => {
  const classes = useStyles();
  const { title, description, archives, social } = sidebar;
  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.about}>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant='h6' gutterBottom className={classes.section}>
        Archives
      </Typography>
      {archives.map((archive, i) => (
        <Link display='block' variant='body1' href={archive.url} key={i}>
          {archive.title}
        </Link>
      ))}
      <Typography variant='h6' gutterBottom className={classes.section}>
        Social
      </Typography>
      {social.map(({ name, Icon }, i) => (
        <Link display='block' variant='body1' href='#' key={i}>
          <Grid container direction='row' spacing={1} alignItems='center'>
            <Grid item>
              <Icon />
            </Grid>
            <Grid item>{name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  );
};
