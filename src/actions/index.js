import axios from 'axios';
import {
  TOKEN_PREFIX,
  AJAX_REQUEST_PROCESSING,
  AJAX_REQUEST_COMPLETED
} from './types';
import Toastr from 'toastr';
import { browserHistory } from 'react-router';  
// export const API_URL = 'http://18.218.135.118/0.2/web-services/0.1/customer';
// export const SEND_GRID  = 'http://18.218.135.118/0.2/sendgrid';
export const API_URL = 'https://apisurreywhales.com/0.2/web-services/0.1/customer';
export const SEND_GRID  = 'https://apisurreywhales.com/0.2/sendgrid';
export const DeviceId = localStorage.getItem('device_id')

// Post Request
export function postData(action, errorType, url, dispatch, data) {
  const requestUrl = API_URL + url;
  dispatch({
    type: AJAX_REQUEST_PROCESSING,
    payload: ''
  });
  axios.defaults.headers.common['Authorization'] = TOKEN_PREFIX + localStorage.getItem('token');
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.post(requestUrl, data)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      responseHandler(response.data, dispatch)
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}
export function postSendGridData(action, errorType, url, dispatch, data) {
  const requestUrl = SEND_GRID + url;
  dispatch({
    type: AJAX_REQUEST_PROCESSING,
    payload: ''
  });
  // axios.defaults.headers.common['Authorization'] = TOKEN_PREFIX + localStorage.getItem('token');
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.post(requestUrl, data)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      responseHandler(response.data, dispatch)
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}


export function logutUser(action, errorType, url, dispatch) {
    
  const custId   = localStorage.getItem('cust_id');
  const sessionKey   = localStorage.getItem('session_key');
  const fcmid   = localStorage.getItem('fcmid');
  let requestUrl = ''
  if(custId && sessionKey){
     requestUrl = API_URL + url + '&cust_id='+custId+'&session_key='+sessionKey+'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+ '&deviceOS=web';
  } else {
     requestUrl = API_URL + url +'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+'&deviceOS=web';
  }

  dispatch({
    type: AJAX_REQUEST_PROCESSING,
    payload: ''
  });
  axios.get(requestUrl)
  .then((response) => {
    localStorage.removeItem('name');
    localStorage.removeItem('cust_id');
    localStorage.removeItem('session_key');
    dispatch({
      type: action,
      payload: response.data,
    });
  
    responseHandler(response.data, dispatch)
      dispatch({
        type: AJAX_REQUEST_COMPLETED,
        payload: ''
      });
      browserHistory.push({
        pathname: '/login',
        search: '',
        state: { previouspath: browserHistory.getCurrentLocation().pathname}
       });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
  }))
}


// Get Request
export function getData(action, errorType, url, dispatch) {
  const custId   = localStorage.getItem('cust_id');
  const sessionKey   = localStorage.getItem('session_key');
  const fcmid   = localStorage.getItem('fcmid');
  let requestUrl = ''
  if(custId && sessionKey){
     requestUrl = API_URL + url + '&cust_id='+custId+'&session_key='+sessionKey+'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+ '&deviceOS=web';
  } else {
     requestUrl = API_URL + url +'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+'&deviceOS=web';
  }
  

  dispatch({
    type: AJAX_REQUEST_PROCESSING,
    payload: ''
  });
  axios.get(requestUrl)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      dispatch({
        type: AJAX_REQUEST_COMPLETED,
        payload: ''
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}


// Get Request
export function getWithMsg(action, errorType, url, dispatch) {
  const custId   = localStorage.getItem('cust_id');
  const sessionKey   = localStorage.getItem('session_key');
  const fcmid   = localStorage.getItem('fcmid');
  let requestUrl = ''
  if(custId && sessionKey){
     requestUrl = API_URL + url + '&cust_id='+custId+'&session_key='+sessionKey+'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+ '&deviceOS=web';
  } else {
     requestUrl = API_URL + url +'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+'&deviceOS=web';
  }
  dispatch({
    type: AJAX_REQUEST_PROCESSING,
    payload: ''
  });
  axios.get(requestUrl)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      responseHandler(response.data, dispatch)
      dispatch({
        type: AJAX_REQUEST_COMPLETED,
        payload: ''
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}


// Get Request
export function login(action, errorType, url, dispatch) {
  const fcmid   = localStorage.getItem('fcmid');
  const requestUrl = API_URL + url +'&fcm_id='+fcmid+'&device_id='+DeviceId+'&deviceOS=web';
  dispatch({
    type: AJAX_REQUEST_PROCESSING,
    payload: ''
  });
  axios.get(requestUrl)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      responseHandler(response.data, dispatch)
      dispatch({
        type: AJAX_REQUEST_COMPLETED,
        payload: ''
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}

// Delete Request
export function deleteData(action, errorType, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {
      headers: {
        Authorization: TOKEN_PREFIX + localStorage.getItem('token')
      }
    };
  
  dispatch({
    type: AJAX_REQUEST_PROCESSING,
    payload: ''
  });
  axios.delete(requestUrl, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      responseHandler(response.data, dispatch)
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}
// ErrorHandler
// Error handler
export function errorHandler(dispatch, error, type) {
  dispatch({
    type: AJAX_REQUEST_COMPLETED,
    payload: ''
  });
  if (error !== undefined) {  
    if ( parseInt(error.status, 10)  !== 401 && parseInt(error.status, 10) >= 400 && parseInt(error.status, 10)  < 600) {
      Toastr.error(error.data.data.message , error.data.data.title, {
        timeOut: 1000
      })
    } else {
      if (parseInt(error.status, 10)  === 401 ) {
        Toastr.error(error.data.data.message , error.data.data.title, {
          timeOut: 1000
        })
        localStorage.removeItem('session_key');
        localStorage.removeItem('cust_id');
        localStorage.removeItem('name');
        browserHistory.push('/login')
      } else {
        Toastr.error(error.data.message, error.data.title, {
          timeOut: 1000
        });
      }
    }
  }
  dispatch({
    type,
    payload: error,
  });
}
// Response Handler
export function responseHandler(response, dispatch) {
  dispatch({
    type: AJAX_REQUEST_COMPLETED,
    payload: ''
  });
  if (response.data !== '') {
    Toastr.success(response.data.message, response.data.title, {
      timeOut: 2000
    })
  }
}


export function postDataAsycPromise(action, errorType,  url, data) {
  const requestUrl = API_URL + url;
  let headers = {};
  
  return axios.post(requestUrl, data, headers);
}


// Get getDataAsycPromise
export function getDataAsycPromise( url) {
  const custId   = localStorage.getItem('cust_id');
  const sessionKey   = localStorage.getItem('session_key');
  const fcmid   = localStorage.getItem('fcmid');
  let requestUrl = ''
  if(custId && sessionKey){
     requestUrl = API_URL + url + '&cust_id='+custId+'&session_key='+sessionKey+'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+ '&deviceOS=web';
  } else {
     requestUrl = API_URL + url +'&device_id='+DeviceId+'&fcm_id='+b64EncodeUnicode(fcmid)+'&deviceOS=web';
  }
  return axios.get(requestUrl);
 
}