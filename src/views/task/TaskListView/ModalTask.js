import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addTask } from 'src/redux/actions/taskActions';

export function ModalTask(props) {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const descriptionRef = useRef();
 // const tasks = useSelector(state => state.tasks);

  const handleSave = async () => {
    dispatch(
      addTask(nameRef.current.value, descriptionRef.current.value, props.date)
    );
    props.setSearch('');
    document.getElementById('search').value = '';
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ADD TASK</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              inputRef={nameRef}
            />
            <TextField
              autoFocus
              inputRef={descriptionRef}
              margin="normal"
              id="description"
              label="Description"
              type="TextField"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Date"
              value={props.date.toLocaleDateString('en-GB')}
              variant="outlined"
              readOnly
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tasks: state
  };
}
export default connect(mapStateToProps, { addTask })(ModalTask);
