import React from 'react';
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
import { loadTasks } from 'src/redux/actions/taskActions';
import DateFnsUtils from '@date-io/date-fns';

export function TaskForm(props) {
  const dispatch = useDispatch();
  const handleSave = async () => {
    await dispatch(updateTask(props.task));
    if (props.date.getDate() !== new Date(props.task.date).getDate())
      await dispatch(loadTasks(props.date));
    props.handleClose();
  };

  const handleChange = e => {
    props.setTask({ ...props.task, [e.target.name]: e.target.value });
  };

  const handleDateChange = async date => {
    props.setTask({
      ...props.task,
      ['date']: date.toISOString()
    });
  };
  const handleChecked = e => {
    props.setTask({ ...props.task, ['completed']: e.target.checked });
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
              defaultValue={props.task.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              defaultValue={props.task.description}
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
                value={props.task.date}
                onChange={e => handleDateChange(e)}
              />
            </MuiPickersUtilsProvider>
            &nbsp;&nbsp;&nbsp;&nbsp; Completed
            <Checkbox checked={props.task.completed} onChange={handleChecked} />
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
