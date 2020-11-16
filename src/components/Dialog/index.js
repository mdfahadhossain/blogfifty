import React, { forwardRef } from 'react';
import { Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

const Transition = forwardRef((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default ({ open, close, title, body, action, btn }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color='secondary'>
          Close
        </Button>
        <Button onClick={action} color='primary' variant='contained'>
          {btn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
