import { GET_PROFILE, AUTH_USER, UNAUTH_USER, AUTH_ERROR, VERIFY_OTP, FORGOT_PASSWORD_REQUEST, REGISTER_USER, GUEST_VERIFY_OTP, RESEND_OTP, CHANGE_PASSWORD_REQUEST, GET_ADDRESS, ADD_ADDRESS, DELETE_ADDRESS,
  CHANGE_EMAIL,
    CHANGE_NAME, 
    CHANGE_ADD_PHONE,
    CHANGE_PHONE_RESEND_OTP,
    CHANGE_PHONE,
    SEND_OTP_REQUEST_FORGET_PASSWORD,
    RESEND_OTP_FORGET_PASSWORD,
    VERIFY_OTP_FORGET_PASSWORD,
    RESET_PASSWORD_REQUEST_FORGET_PASSWORD,SEARCH_ADDRESS  } from '../actions/types';

const INITIAL_STATE = {searchaddress:[], otpsend:false, resend:false, verifyotp:false,  added:false, error: '', message: '', loginUser:null, profile:[],  address:[], isadded: false, isupdated: false,conversationauthkey: '', authenticated: false, guest_verification: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_ADDRESS: {
      state = { ...state, searchaddress: action.payload.data};
      break;
    }
    case SEND_OTP_REQUEST_FORGET_PASSWORD: {
      state = { ...state, cust_id: action.payload.data.data, otpsend:true, resend:false, verifyotp:false,isupdated:false };
      break;
    }
    case RESEND_OTP_FORGET_PASSWORD: {
      state = { ...state,   otpsend:false, resend:true, verifyotp:false, isupdated:false};
      break;
    }
    case VERIFY_OTP_FORGET_PASSWORD: {
      state = { ...state,    otpsend:false,  resend:false, verifyotp:true, isupdated:false};
      break;
    }
    case RESET_PASSWORD_REQUEST_FORGET_PASSWORD: {      
      state = { ...state, otpsend:false, resend:false, verifyotp:false, isupdated:true };
      break;
    }

    case CHANGE_EMAIL: {
      state = { ...state,  isupdated:true };
      break;
    }
    case CHANGE_ADD_PHONE: {
      state = { ...state,  added:true, resend:false };
      break;
    }
    case CHANGE_PHONE_RESEND_OTP: {
      state = { ...state,  resend:true, added:false };
      break;
    }

    case CHANGE_PHONE: {
      state = { ...state,  isupdated:true, resend:false, added:false };
      break;
    }
    case CHANGE_NAME: {
      state = { ...state,  isupdated:true };
      break;
    }
    case GET_PROFILE: {
      state = { ...state, profile: action.payload.data,   isupdated:false };
      break;
    }
    case AUTH_USER: {
      state = { ...state, loginUser: action.payload.data, authenticated: true, isadded: false, guest_verification: '' };
      break;
    }
    case UNAUTH_USER: {
      state = { ...state, authenticated: false, error: action.payload, isadded: false, guest_verification: '' };
      break;
    }
    case AUTH_ERROR: {
      state = { ...state, error: action.payload };
      break;
    }
    case RESEND_OTP: {
      state = { ...state, message: action.payload.message  };
      break;
    }
    case CHANGE_PASSWORD_REQUEST: {
      state = { ...state, isupdated:true};
      break;
    }
    case GET_ADDRESS: {
      state = { ...state, address: action.payload.data, isupdated:false};
      break;
    }
    
    case ADD_ADDRESS: {
      state = { ...state, isupdated:true};
      break;
    }
    case DELETE_ADDRESS: {
      state = { ...state, isupdated:true};
      break;
    }
    
    case FORGOT_PASSWORD_REQUEST: {
      state = { ...state, message: action.payload.message };
      break;
    }
    case REGISTER_USER: {
      state = { ...state, message: action.payload.message, isadded: true, guest_verification: '', isupdated:false  };
      break;
    }
    case VERIFY_OTP: {
      state = { ...state, authenticated: false, isadded: false, isupdated:true };
      break;
    }
    case GUEST_VERIFY_OTP: {
      state = { ...state, error: '', message: '', guest_verification: action.payload.data };
      break;
    }

    default: {
      state = { ...state };
      break;
    }
  }
  return state;
}