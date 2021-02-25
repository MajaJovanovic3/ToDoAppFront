import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const composeEnhancers=window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk,reduxImmutableStateInvariant()))
  );
}
