import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { connect, useDispatch } from 'react-redux';
import { updateTask } from 'src/redux/actions/taskActions';
import { TaskForm } from './TaskForm';
import { TaskInfo } from './TaskInfo';
import { uploadFile } from '../../../api/tasksApi';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';
import { useStylesTaskCard } from 'src/common/useStyles';

const TaskCard = ({ className, taskProp, ...rest }) => {
  const classes = useStylesTaskCard();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [task, setTask] = useState(taskProp);

  const handleClose = () => {
    setOpenInfo(false);
    setOpen(false);
  };
  const handleClickInfo = () => {
    setOpenInfo(true);
  };

  const handleClickEdit = () => {
    setOpen(true);
  };

  const handleChecked = e => {
    setTask({ ...task, ['completed']: e.target.checked });
    dispatch(updateTask({ ...task, ['completed']: e.target.checked }));
  };

  async function handleUpload(e, taskId) {
    const data = new FormData();
    data.append('myFile', e.target.files[0]);
    data.set('taskId', taskId);
    let response = await uploadFile(data);
    setTask(response);
  }

  const props = {
    open: open,
    task: task,
    setTask: setTask,
    handleChecked: handleChecked,
    handleClose: handleClose
  };
  
  const propsInfo = {
    openInfo: openInfo,
    task: task,
    handleClose: handleClose
  };
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      style={{ background: task.completed ? '#83acd5' : 'none' }}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}></Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {task.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {task.description}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <Checkbox checked={task.completed} onChange={handleChecked} />
          Completed
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2} style={{ background: '#e1e4f6' }}>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <Button
              style={{ background: '#e1e4f6', color: '#3f51b5' }}
              onClick={handleClickInfo}
            >
              <InfoIcon />
            </Button>
            <EditIcon onClick={handleClickEdit} />
            <DeleteForeverIcon />
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography color="textSecondary" display="inline" variant="body2">
              <label htmlFor="btn-upload">
                <Button
                  className="btn-choose"
                  variant="outlined"
                  component="span"
                >
                  <AttachFileIcon /> Attach
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    multiple
                    onChange={e => handleUpload(e, task._id)}
                  />
                </Button>
              </label>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TaskInfo {...propsInfo} />
        <TaskForm {...props} />
      </Box>
    </Card>
  );
};

TaskCard.propTypes = {
  className: PropTypes.string,
  task: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    tasks: state
  };
}

export default connect(mapStateToProps, { updateTask })(TaskCard);
