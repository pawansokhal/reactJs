import { 
  BAREXCHANGES_CATEGORIES,
  BAREXCHANGES_PRODUCTS,
  BAREXCHANGES_PRODUCTS_ADD_TO_FAVOURATE,
  BAREXCHANGES_PRODUCTS_REMOVE_TO_FAVOURITE,
  BAREXCHANGES_PRODUCTS_LIST_FAVOURITE,
  BAREXCHANGES_ERROR 
    } from '../actions/types';

const INITIAL_STATE = { 
  barexchangescategories:[],
  barexchangesproducts:[],
  barexchangesfavourate:[],
  error: '',
  isupdated: false,
 };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BAREXCHANGES_PRODUCTS_LIST_FAVOURITE: {
      state = { ...state, barexchangesfavourate: action.payload.data,   isupdated: false};
      break;
    }
    case BAREXCHANGES_CATEGORIES: {
      state = { ...state, barexchangescategories: action.payload.data,   isupdated: false};
      break;
    }
    case BAREXCHANGES_PRODUCTS_ADD_TO_FAVOURATE: {
      state = { ...state, isupdated: true };
      break;
    }
    case BAREXCHANGES_PRODUCTS_REMOVE_TO_FAVOURITE: {
      state = { ...state, isupdated: true };
      break;
    }
    case BAREXCHANGES_PRODUCTS: {
      state = { ...state, barexchangesproducts: action.payload.data, isupdated: false };
      break;
    }  
    case BAREXCHANGES_ERROR: {  
      state = { ...state, error: action.payload };     
      break;
    }
    
    default: {
      state = {...state};
      break;
    }
  }
  return state;
}
