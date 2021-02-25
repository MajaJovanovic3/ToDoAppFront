import * as types from './actionTypes';
import * as taskApi from '../../api/tasksApi';

export const addTasksSuccess = task => ({
  type: types.ADD_TASKS_SUCCESS,
  payload: task
});

export const loadTasksSuccess = tasks => ({
  type: types.LOAD_TASKS_SUCCESS,
  payload: tasks
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
