
import { logutUser, getData, getWithMsg, login} from '.';
import {
  AUTH_USER, AUTH_ERROR, UNAUTH_USER, VERIFY_OTP, REGISTER_USER,
  CHANGE_PASSWORD_REQUEST, RESEND_OTP,
  GET_ADDRESS, ADD_ADDRESS, DELETE_ADDRESS,
  GET_PROFILE,
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_ADD_PHONE,
  CHANGE_PHONE_RESEND_OTP,
  CHANGE_PHONE,
  FORGOT_PASSWORD_REQUEST,
  SEND_OTP_REQUEST_FORGET_PASSWORD,
  RESEND_OTP_FORGET_PASSWORD,
  VERIFY_OTP_FORGET_PASSWORD,
  RESET_PASSWORD_REQUEST_FORGET_PASSWORD,
  FETCH_CART_COUNT, SEARCH_ADDRESS,CHANGE_PREFERENCE_FREE_RECYCLING, CHANGE_PREFERENCE_TAKE_ORDER_FROM_HOME
} from './types';
// import logout from '../components/auth/logout';

//= ===============================
// Authentication actions
//= ===============================

export function signUpUser(data) {
  const url = '/ws_register.php?function=register&' + data;
  return dispatch => getWithMsg(REGISTER_USER, AUTH_ERROR, url, dispatch)
}

export function verifyOtpKey(data) {
  const url = '/ws_verify_phone_number.php?function=verify_phone_number&' + data;
  return dispatch => getWithMsg(VERIFY_OTP, AUTH_ERROR, url, dispatch)
}

export function resendOtp(data) {
  const url = '/ws_resend_phone_verification_pin.php?function=resend_phone_verification_pin&' + data;
  return dispatch => getWithMsg(RESEND_OTP, AUTH_ERROR, url, dispatch)
}

export function loginUser(data) {
  const url = '/ws_login.php?function=login&' + data;
  return dispatch => login(AUTH_USER, AUTH_ERROR, url, dispatch)
}

export function getProfile(data) {
  const url = '/ws_my_account_profile.php?function=get_my_profile&' + data;
  return dispatch => getData(GET_PROFILE, AUTH_ERROR, url, dispatch)
}

export function changeName(data) {
  const url = '/ws_my_account_profile.php?function=change_name&' + data;
  return dispatch => getWithMsg(CHANGE_NAME, AUTH_ERROR, url, dispatch)
}

export function changeEmail(data) {
  const url = '/ws_my_account_profile.php?function=change_email&' + data;
  return dispatch => getWithMsg(CHANGE_EMAIL, AUTH_ERROR, url, dispatch)
}

export function changeAndAddNewPhone(data) {
  const url = '/ws_my_account_profile.php?function=change_phone_add_new_number&' + data;
  return dispatch => getWithMsg(CHANGE_ADD_PHONE, AUTH_ERROR, url, dispatch)
}

export function changePhoneResendOtp(data) {
  const url = '/ws_my_account_profile.php?function=change_phone_resend_otp&' + data;
  return dispatch => getWithMsg(CHANGE_PHONE_RESEND_OTP, AUTH_ERROR, url, dispatch)
}

export function changePhoneVerifyOtp(data) {
  const url = '/ws_my_account_profile.php?function=change_phone_verify_otp&' + data;
  return dispatch => getWithMsg(CHANGE_PHONE, AUTH_ERROR, url, dispatch)
}

export function logout() {
  const url = '/ws_logout.php?function=logout&';
  return dispatch => 
  {
    dispatch({
      type: GET_PROFILE,
      payload: {data:[] }
    });
    dispatch({
      type: FETCH_CART_COUNT,
      payload: {data:{} }
    });
     return logutUser(UNAUTH_USER, AUTH_ERROR, url, dispatch)
  }
}

export function changePassword(data) {
  const url = '/ws_change_password.php?function=change_password&' + data;
  return dispatch => getWithMsg(CHANGE_PASSWORD_REQUEST, AUTH_ERROR, url, dispatch)
}

export function requestForgetPassword(data){
  const url = '/ws_my_account_profile.php?function=change_email&' + data;
  return dispatch => getWithMsg(FORGOT_PASSWORD_REQUEST, AUTH_ERROR, url, dispatch)
}
export function sendOtpForForgetPassword(data) {
  const url = '/ws_password_reset.php?function=validate_phone_number&' + data;
  return dispatch => getWithMsg(SEND_OTP_REQUEST_FORGET_PASSWORD, AUTH_ERROR, url, dispatch)
}

// export function sendOtpForForgetPassword(data){
//   const url = '/ws_password_reset.php?function=validate_phone_number&' + data;
//       return dispatch => {
//           dispatch({
//               type: AJAX_REQUEST_PROCESSING,
//               payload: ''
//             });
//           return getDataAsycPromise(url)
//               .then((response) => {
//                 dispatch({
//                   type: SEND_OTP_REQUEST_FORGET_PASSWORD,
//                   payload: {data:[]}
//               });
//                   dispatch({
//                       type: SEND_OTP_REQUEST_FORGET_PASSWORD,
//                       payload: response.data,
//                   });
//                   responseHandler(response.data, dispatch)
//                   return response;
//               })
//               .catch((error) => {
//                   errorHandler(dispatch, error.response, AUTH_ERROR);
//                   throw(error);
//               })
//       }
//   }


export function resendOtpForForgetPassword(data) {
  const url = '/ws_password_reset.php?function=resend_otp&' + data;
  return dispatch => getWithMsg(RESEND_OTP_FORGET_PASSWORD, AUTH_ERROR, url, dispatch)
}
export function verifyOtpForForgetPassword(data) {
  const url = '/ws_password_reset.php?function=verify_otp&' + data;
  return dispatch => getWithMsg(VERIFY_OTP_FORGET_PASSWORD, AUTH_ERROR, url, dispatch)
}
export function resetPassword(data) {
  const url = '/ws_password_reset.php?function=reset_password&' + data;
  return dispatch => getWithMsg(RESET_PASSWORD_REQUEST_FORGET_PASSWORD, AUTH_ERROR, url, dispatch)
}

export function getAddress() {
  const url = '/ws_get_my_addresses.php?function=get_my_addresses&';
  return dispatch => getData(GET_ADDRESS, AUTH_ERROR, url, dispatch)
}

export function addAddress(data) {
  const url = '/ws_add_address.php?function=add_address&' + data;
  return dispatch => getWithMsg(ADD_ADDRESS, AUTH_ERROR, url, dispatch)
}

export function searchAddressViaPostCode(data) {
  const url = '/ws_add_address.php?function=search_postcode&' + data;
  return dispatch => getData(SEARCH_ADDRESS, AUTH_ERROR, url, dispatch)
}

export function deleteAddress(data) {
  const url = '/ws_delete_address.php?function=delete_address&' + data;
  return dispatch => getWithMsg(DELETE_ADDRESS, AUTH_ERROR, url, dispatch)
}


export function takeOrderFromFome(data) {
  const url = '/ws_my_account_profile.php?function=change_preference_take_order_from_home&' + data;
  return dispatch => getWithMsg(CHANGE_PREFERENCE_TAKE_ORDER_FROM_HOME, AUTH_ERROR, url, dispatch)
}
export function freeRecycling(data) {
  const url = '/ws_my_account_profile.php?function=change_preference_free_recycling&' + data;
  return dispatch => getWithMsg(CHANGE_PREFERENCE_FREE_RECYCLING, AUTH_ERROR, url, dispatch)
}

