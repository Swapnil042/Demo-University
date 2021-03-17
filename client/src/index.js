import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/loadUsers';
import studentReducer from './store/reducers/students';
import courseReducer from './store/reducers/courses';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  student: studentReducer,
  course: courseReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
   {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
