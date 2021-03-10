import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { updateTask } from 'src/redux/actions/taskActions';
import DateFnsUtils from '@date-io/date-fns';

export function TaskForm(props) {
  const dispatch = useDispatch();
  const [editTask, setEditTask] = useState(props.task);

  const handleSave = () => {
    dispatch(updateTask(editTask));
    props.setTask(editTask);
    props.handleClose();
  };

  const handleChange = e => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleDateChange = async date => {
    setEditTask({ ...editTask, ['date']: date });
  };
  const handleChecked = e => {
    setEditTask({ ...editTask, ['completed']: e.target.checked });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">EDIT TASK</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              defaultValue={editTask.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              defaultValue={editTask.description}
              margin="normal"
              name="description"
              label="Description"
              type="TextField"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={editTask.date}
                onChange={e => handleDateChange(e)}
              />
            </MuiPickersUtilsProvider>
            &nbsp;&nbsp;&nbsp;&nbsp; Completed
            <Checkbox checked={editTask.completed} onChange={handleChecked} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    task: state
  };
}
export default connect(mapStateToProps, { updateTask })(TaskForm);
