import * as types from '../actions/actionTypes';
const initialState = {
  tasks: []
};
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TASKS_SUCCESS:
      return [...state, action.payload]
    case types.LOAD_TASKS_SUCCESS:
      return action.payload
    default:
      return state;
  }
}
