import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import configureStore from './redux/configureStore'
import {Provider} from 'react-redux'

const store=configureStore()

ReactDOM.render((
  <Provider store={store}>
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
    </Provider>
), document.getElementById('root'));
serviceWorker.unregister();
