import * as types from './actionTypes';
import * as taskApi from '../../api/tasksApi';

export const addUser = user => ({
  type: types.ADD_USER,
  payload: user
});

export const addTasksSuccess = task => ({
  type: types.ADD_TASKS_SUCCESS,
  payload: task
});

export const loadTasksSuccess = tasks => ({
  type: types.LOAD_TASKS_SUCCESS,
  payload: tasks
});

export const updateTasksSuccess = task => ({
  type: types.UPDATE_TASKS_SUCCESS,
  payload: task
});
export function loadTasks(date) {
  return function(dispatch) {
    return taskApi
      .getTasks(date)
      .then(response => {
        dispatch(loadTasksSuccess(response));
      })
      .catch(error => {
        throw error;
      });
  };
}
export function addTask(name, description, date) {
  return function(dispatch) {
    return taskApi
      .saveTask(name, description, date)
      .then(res => {
        if (res.isSaved) {
          alert(res.message);
          dispatch(addTasksSuccess(res.task));
        }
      })
      .catch(error => {
        throw error;
      });
  };
}
export function updateTask(task) {
  return function(dispatch) {
    return taskApi
      .updateTask(task)
      .then(res => {
        if (res.isUpdated) {
          alert(res.message);
          dispatch(updateTasksSuccess(res.task));
        }
      })
      .catch(error => {
        throw error;
      });
  };
}
