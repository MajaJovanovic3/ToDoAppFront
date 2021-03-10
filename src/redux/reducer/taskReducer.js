import * as types from '../actions/actionTypes';
const initialState = {
  tasks: []
};
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TASKS_SUCCESS:
      return [...state, action.payload];
    case types.LOAD_TASKS_SUCCESS:
      return action.payload;
    case types.UPDATE_TASKS_SUCCESS:
      return state.map(task => {
        if (task._id === action.payload._id)
          return {
            ...task,
            name: action.payload.name,
            description: action.payload.description,
            completed: action.payload.completed,
            date: action.payload.date
          };
        else return task;
      });
    default:
      return state;
  }
}
