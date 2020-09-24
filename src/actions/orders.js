import { getData, getWithMsg } from '.';
import {
    FETCH_ORDERS, ORDERS_PLACED, ORDER_ERROR, RETURN_ORDERS, CANCEL_ORDERS,
    OFFERS_AND_COUPONS, ORDERS_PRODUCT_REVIEW_RATING, ORDER_PRODUCT_DETAILS,
    CANCEL_REASON
} from './types';

//= ===============================
// Order actions
//= ===============================
export function placedOrders(queryString) {
    const url = '/ws_place_order.php?function=confirm_and_place_order&' + queryString;
    return dispatch => getWithMsg(ORDERS_PLACED, ORDER_ERROR, url, dispatch)
}

export function fetchOrders(queryString) {
    const url = '/ws_get_my_orders_list.php?function=get_my_orders&' + queryString;
    return dispatch => getData(FETCH_ORDERS, ORDER_ERROR, url, dispatch)
}

export function fetchOrdersDetails(queryString) {
    const url = '/ws_get_my_orders_detail.php?function=get_my_orders_detail&' + queryString;
    return dispatch => getData(ORDER_PRODUCT_DETAILS, ORDER_ERROR, url, dispatch)
}
export function ordersRatingReview(queryString) {
    const url = '/ws_add_order_review.php?function=add_order_review&' + queryString;
    return dispatch => getData(ORDERS_PRODUCT_REVIEW_RATING, ORDER_ERROR, url, dispatch)
}

export function fetchReturnOrder(queryString) {
    const url = '/customer/orders/return?' + queryString;
    return dispatch => getData(RETURN_ORDERS, ORDER_ERROR, url, dispatch);
}

export function cancelOrder(queryString) {
    const url = '/ws_get_my_orders_detail.php?function=cancel_order&' + queryString;
    return dispatch => getWithMsg(CANCEL_ORDERS, ORDER_ERROR, url, dispatch)
}

export function fetchCancellationReasonsList() {
    const url = '/ws_get_my_orders_detail.php?function=cancellation_reasons_list&';
    return dispatch => getData(CANCEL_REASON, ORDER_ERROR, url, dispatch);
}

export function couponsAndOffers() {
    const url = '/ws_offers.php?function=offers_list';
    return dispatch => getData(OFFERS_AND_COUPONS, ORDER_ERROR, url, dispatch);
}
// export function fetchCancelOrderProductDetails(pId){
//     const url = '/customer/orders/cancel/'+pId;        
//     return dispatch => getData(ORDER_PRODUCT_DETAILS, ORDER_ERROR, url, dispatch);    
// }
