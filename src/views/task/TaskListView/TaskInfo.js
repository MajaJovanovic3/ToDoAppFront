import React from 'react';
import Carousel from 'react-material-ui-carousel';
import pdf from '@material-ui/icons/PictureAsPdf';
import SubjectIcon from '@material-ui/icons/Subject';
import { createMuiTheme, Backdrop } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { AlignCenter } from 'react-feather';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c52b2'
    }
  }
});
export const TaskInfo = props => {
  console.log(props.task.completed);
  let blob;
  return (
    <div>
      <Dialog
        open={props.openInfo}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div style={{ backgroundImage: "url('http://localhost:3000/aa.png')" ,  backgroundSize:"cover"}}>
        <DialogTitle id="form-dialog-title" >TASK DETAIL</DialogTitle>
        <DialogContent >
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
              defaultValue={props.task.date.slice(0, 10)}
              margin="normal"
              label="Description"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
            {props.task.completed === true
              ? 'Task is completed successfully'
              : "Task isn't completed yet!"}
          </div>
          {props.task.files.length > 0 ? (
            <Carousel>
              {props.task.files.map(item =>
                item.split('.').pop() == 'jpg' ||
                item.split('.').pop() == 'jpeg' ||
                item.split('.').pop() == 'png' ? (
                  <img
                    src={`http://localhost:3001/files/${item}`}
                    href={`http://localhost:3001/files/${item}`}
                    target="_blank"
                    style={{
                      width: 200,
                      height: 200,
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  />
                ) : null
              )}
            </Carousel>
          ) : null}
        </DialogContent>
        <DialogActions >
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
