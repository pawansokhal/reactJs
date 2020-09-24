import { 
  FETCH_BEST_SELLERS,
  FETCH_BRANDS,
   FETCH_BANNERS,
    HOME_ERROR,
     FETCH_CATEGORIES, 
     FETCH_CHILD_CATEGORIES,
      FETCH_ALL_CATEGORIES,
      HOME_PAGE_PRODUCTS
    } from '../actions/types';

const INITIAL_STATE = { 
  bestsellers:[],
  error: '',
  banners:[],
  brands:[],
  categories:{},
  childcategories:{},
  allCategories:[],
  products:[],
  isupdated: false,
 };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_PAGE_PRODUCTS: {
      state = { ...state, products: action.payload.data };
      break;
    }
    case FETCH_BEST_SELLERS: {
        state = { ...state, bestsellers: action.payload.data };
        break;
    }  
    case FETCH_BRANDS: {      
      state = { ...state, brands: action.payload.data };     
      break;
    }
    case FETCH_BANNERS: {      
      state = { ...state, banners: action.payload.data };     
      break;
    }
    case HOME_ERROR: {  
      state = { ...state, error: action.payload };     
      break;
    }
    case FETCH_CATEGORIES: {   
      state = { ...state, categories: action.payload.data };     
      break;
    }
    case FETCH_CHILD_CATEGORIES: {   
      state = { ...state, childcategories: action.payload.data };     
      break;
    }
    case FETCH_ALL_CATEGORIES: {   
      state = { ...state, allCategories: action.payload.data };     
      break;
    }
    default: {
      state = {...state};
      break;
    }
  }
  return state;
}
