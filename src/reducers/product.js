import {
  HOME_PAGE_PRODUCTS, 
  EMPTY_STATE,
  FETCH_PRODUCT_DETAILS,FETCH_COMBO_PRODUCT_DETAILS,FETCH_PRODUCTS_SEARCH, PRODUCT_ERROR, FETCH_PRODUCT_VARIANT_DETAILS, FETCH_PRODUCTS_JUST_ARRIVED,
  FETCH_PRODUCTS, REMOVE_CART_ITEM, FETCH_PRODUCT_FILTERS, ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_WISHLIST, FETCH_SIMILAR_PRODUCTS
  ,FETCH_WISHLIST_COUNT, FETCH_CART_COUNT,GET_WISHLIST_ITEMS,REMOVE_WISHLIST_ITEM, GET_CART_ITEMS,GET_PRODUCT_REVIEW,
  ADD_PRODUCT_REVIEW,
  FETCH_PRODUCT_DETAILS_FOR_QUICK_VIEW,
  TIME_SLOT,
  FETCH_ZIPCODE
} from '../actions/types';

const INITIAL_STATE = {
  products: [],
  similarproducts: [],
  searchproducts: [],
  error: '',
  justarrivedproducts: [],
  filters: [],
  productdetails: [],
  productvariantdetails: [],
  isupdated: false,
  wishlistcount: [], 
  wishlistdata: [],
  cartcount:[],
  cartdata:[],
  productreview:[],
  added:false,
  homeproducts:[],
  comboproductdetails:[],
  productdetailsquickview:[],
  timeslot:[],
  zipcodes:[]
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TIME_SLOT: {
      state = { ...state, timeslot: action.payload.data };
      break;
    }

    case FETCH_ZIPCODE: {
      state = { ...state, zipcodes: action.payload.data };
      break;
    }
    

    case HOME_PAGE_PRODUCTS: {
      state = { ...state, homeproducts: action.payload.data,isupdated: false, added:false };
      break;
    }
    
    case GET_PRODUCT_REVIEW: {
      state = { ...state, productreview: action.payload.data, isupdated: false, added:false};
      break;
    }
    
    case ADD_PRODUCT_REVIEW: {
      state = { ...state, added: true };
      break;
    }
    case FETCH_PRODUCT_DETAILS: {
      state = { ...state, productdetails: action.payload.data, isupdated: false, added: false };
      break;
    }
    case FETCH_PRODUCT_DETAILS_FOR_QUICK_VIEW: {
      state = { ...state, productdetailsquickview: action.payload.data, isupdated: false, added: false };
      break;
    }
    
    case FETCH_COMBO_PRODUCT_DETAILS: {
      state = { ...state, comboproductdetails: action.payload.data, isupdated: false, added: false };
      break;
    }
    
    case EMPTY_STATE: {
      state = { ...state, productdetails:[],productdetailsquickview:[]};
      break;
    }
    case PRODUCT_ERROR: {
      state = { ...state, error: action.payload, isupdated: false, products: [],  productreview:[],  added:false};
      break;
    }
    case FETCH_PRODUCTS_SEARCH: {
      state = { ...state, searchproducts: action.payload.data, isupdated: false, similarproducts: [], productvariantdetails: [] , added:false};
      break;
    }
    case FETCH_PRODUCTS: {
      state = { ...state, products: action.payload.data, isupdated: false, similarproducts: [], productvariantdetails: [] , added:false};
      break;
    }
    case FETCH_PRODUCT_VARIANT_DETAILS: {
      state = { ...state, productvariantdetails: action.payload.data, isupdated: false, products: [] };
      break;
    }
    case FETCH_PRODUCT_FILTERS: {
      state = { ...state, filters: action.payload.data, isupdated: false, added:false};
      break;
    }
    case FETCH_WISHLIST_COUNT: {
      state = { ...state, wishlistcount: action.payload.data, isupdated: false };
      break;
    }

    case GET_WISHLIST_ITEMS: {
      state = { ...state, wishlistdata: action.payload.data, isupdated: false };
      break;
    }
    case REMOVE_WISHLIST_ITEM: {
      state = { ...state, isupdated: true, added:true };
      break;
    }    

    case FETCH_CART_COUNT: {
      state = { ...state, cartcount: action.payload.data, isupdated: false };
      break;
    }
    case GET_CART_ITEMS: {
      state = { ...state, cartdata: action.payload.data, isupdated: false, added:false };
      break;
    }

    case REMOVE_CART_ITEM: {
      state = { ...state, isupdated: true, added:true};
      break;
    }
    case ADD_PRODUCT_TO_CART: {
      state = { ...state, isupdated: true, added:true};
      break;
    }
    case ADD_PRODUCT_TO_WISHLIST: {
      state = { ...state, isupdated: true, added:true };
      break;
    }
    case FETCH_SIMILAR_PRODUCTS: {
      state = { ...state, similarproducts: action.payload.data };
      break;
    }
    case FETCH_PRODUCTS_JUST_ARRIVED: {
      state = { ...state, justarrivedproducts: action.payload.data };
      break;
    }
    default: {
      state = { ...state };
      break;
    }
  }
  return state;
}
