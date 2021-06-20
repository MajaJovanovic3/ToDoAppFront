import * as types from '../actions/actionTypes';
const initialState = {
  user: JSON.parse(sessionStorage.getItem('user'))
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_USER:
      return { ...state, user: action.payload };
    case types.REMOVE_USER:
      return { ...state, user: null };
    default:
      return { ...state };
  }
}
