import React, { useState, useEffect } from 'react';
import { Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Grid } from '@material-ui/core';

export default ({ anchorEl, setAnchorEl }) => {
  const [notifications] = useState([0, 1, 2, 3, 4]);
  useEffect(() => {
    // setNotifications([...notifications, 5]);
  }, [notifications]);
  return (
    <Popper open={!!anchorEl} anchorEl={anchorEl} transition disablePortal style={{ zIndex: 9 }}>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}>
          <Paper>
            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
              <MenuList autoFocusItem={!!anchorEl}>
                {notifications.map((i) => (
                  <MenuItem key={i}>
                    <Grid style={{ width: '500px' }}>
                      <h4>Notification title</h4>
                      <p>Notification body</p>
                    </Grid>
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
