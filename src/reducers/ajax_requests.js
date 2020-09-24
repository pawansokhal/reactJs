import {
    AJAX_REQUEST_PROCESSING, AJAX_REQUEST_COMPLETED 
  } from '../actions/types';

const INITIAL_STATE = { isajaxprocessing: false};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AJAX_REQUEST_PROCESSING:{
      state = { ...state, isajaxprocessing: state.isajaxprocessing + 1 };
      break;
    }
    case AJAX_REQUEST_COMPLETED:{
      state = { ...state, isajaxprocessing: parseInt(state.isajaxprocessing, 10) - 1 };
      break;
    }
    default: {
        state = {...state};
    }
  }
  return state;
}