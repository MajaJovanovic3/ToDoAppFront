import { combineReducers } from 'redux';
import tasks from './taskReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  tasks,
  user,
});

export default rootReducer;
