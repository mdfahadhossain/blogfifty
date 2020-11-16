import React from 'react';
import { Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';

export default ({ anchorEl, setAnchorEl, onLogout }) => {
  return (
    <Popper open={!!anchorEl} anchorEl={anchorEl} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}>
          <Paper>
            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
              <MenuList autoFocusItem={!!anchorEl}>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
