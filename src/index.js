import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from "redux-thunk";
import routes from './routes';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
const middleware = applyMiddleware(reduxThunk);
const store = createStore(reducers, middleware);

const token = localStorage.getItem('token');
if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    // console.log('registration', registration)
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}  />
    </Provider>
    , document.getElementById('wrapper')
);
registerServiceWorker();
