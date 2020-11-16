import React from 'react';
import { makeStyles, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { Categories } from '../../constants/categories';

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textTransform: 'capitalize',
    color: '#999',
    textDecoration: 'none',
    letterSpacing: '1px',
    fontSize: '13px',
  },
}));

export default ({ query }) => {
  const classes = useStyles();
  return (
    <Toolbar component='nav' variant='dense' className={classes.toolbarSecondary}>
      {Categories.map(({ name }) => (
        <NavLink exact key={name} to={`/?name=${name}${!!query ? '&query=' + query : ''}`} className={classes.toolbarLink}>
          {name}
        </NavLink>
      ))}
    </Toolbar>
  );
};
