import { L_POINT, L_POINT_BOTEL_SELECT, OFFER_PAGE } from '../actions/types';

const INITIAL_STATE = { lpoints: [], isupdated: false, offers: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case L_POINT: {
      state = { ...state, lpoints: action.payload.data, isupdated: false };
      break;
    }
    case L_POINT_BOTEL_SELECT: {
      state = { ...state, isupdated: true };
      break;
    }
    case OFFER_PAGE: {
      state = { ...state, offers: action.payload.data };
      break;
    }
    default: {
      state = { ...state };
      break;
    }
  }
  return state;
}
