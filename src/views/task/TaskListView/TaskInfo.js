import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

export function TaskInfo(props) {
  return (
    <div>
      <Dialog
        open={props.openInfo}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">TASK DETAIL</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Name"
              variant="outlined"
              defaultValue={props.task.name}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              autoFocus
              defaultValue={props.task.description}
              margin="normal"
              label="Description"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              autoFocus
              defaultValue={props.task.date.slice(0,10)}
              margin="normal"
              label="Description"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
            {props.task.completed == 'true'
              ? 'Task is completed successfully'
              : "Task isn't completed yet!"}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
