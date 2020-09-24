import {
    ORDERS_PLACED, FETCH_ORDERS, RETURN_ORDERS, CANCEL_ORDERS, ORDER_ERROR,
    FETCH_ORDER, ORDER_PRODUCT_DETAILS, CANCEL_ORDER_PRODUCT, RETURN_ORDER_PRODUCT,
    ORDERS_PRODUCT_REVIEW_RATING, OFFERS_AND_COUPONS, CANCEL_REASON
} from '../actions/types';

const INITIAL_STATE = {
    orders: [], 
    offersandcoupons: [],
    order: [],
    returnorders: [],
    cancelorders: [],
    error: '', 
    isupdated: false,
    orderproductdetail: [],
    cancelreasons:[]
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case OFFERS_AND_COUPONS: {
            state = { ...state, offersandcoupons: action.payload.data, isupdated: false };
            break;
        }
        case ORDERS_PLACED: {
            state = { ...state, isupdated: true };
            break;
        }
        case ORDERS_PRODUCT_REVIEW_RATING: {
            state = { ...state, isupdated: true, orderproductdetail: [] };
            break;
        }

        case FETCH_ORDERS: {
            state = { ...state, orders: action.payload.data, orderproductdetail: [], order: [], isupdated: false };
            break;
        }
        case RETURN_ORDERS: {
            state = { ...state, returnorders: action.payload.data, orderproductdetail: [], isupdated: false };
            break;
        }
        case CANCEL_ORDERS: {
            state = { ...state, isupdated: true };
            break;
        }
        case CANCEL_REASON: {
            state = { ...state, cancelreasons: action.payload.data, isupdated: false };
            break;
        }

        case ORDER_ERROR: {
            state = { ...state, error: action.payload, isupdated: false };
            break;
        }
        case FETCH_ORDER: {
            state = { ...state, order: action.payload.data, orderproductdetail: [], isupdated: false };
            break;
        }
        case ORDER_PRODUCT_DETAILS: {
            state = { ...state, orderproductdetail: action.payload.data, isupdated: false };
            break;
        }
        case CANCEL_ORDER_PRODUCT: {
            state = { ...state, isupdated: true, orders: [] };
            break;
        }
        case RETURN_ORDER_PRODUCT: {
            state = { ...state, isupdated: true, orders: [] };
            break;
        }
        default: {
            state = { ...state };
            break;
        }
    }
    return state;
}
