import { getData, getWithMsg, getDataAsycPromise, errorHandler, responseHandler } from './index';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SEARCH,
    FETCH_PRODUCT_DETAILS,
    FETCH_COMBO_PRODUCT_DETAILS,
    ADD_PRODUCT_TO_CART,
    REMOVE_CART_ITEM,
    GET_CART_ITEMS,
    ADD_PRODUCT_TO_WISHLIST,
    PRODUCT_ERROR,
    GET_WISHLIST_ITEMS,
    FETCH_CART_COUNT,
    REMOVE_WISHLIST_ITEM,
    GET_PRODUCT_REVIEW,
    ADD_PRODUCT_REVIEW,
    FETCH_PRODUCT_FILTERS,
    ORDER_ERROR,
    FETCH_PRODUCTS_JUST_ARRIVED,
    HOME_ERROR,
    HOME_PAGE_PRODUCTS,
    FETCH_PRODUCT_DETAILS_FOR_QUICK_VIEW,
    AJAX_REQUEST_PROCESSING,
    TIME_SLOT,
    FETCH_ZIPCODE
} from './types';


export function homePageProduct(){
    const url = '/ws_get_home_screen_products.php?function=get_featured_products&device_id=web';
    return dispatch => getData(HOME_PAGE_PRODUCTS, HOME_ERROR, url, dispatch);
}
/*  Banner */
export function getproducts() {
    const url = 'ws_get_home_page_slider.php?function=get_home_page_slider';
    return dispatch => getData(FETCH_PRODUCTS, PRODUCT_ERROR, url, dispatch);
}
/* product */
export function getProductList(data) {
    const url = '/ws_get_products_list.php?function=get_products&' + data;
    return dispatch =>{
        dispatch({
            type: FETCH_PRODUCTS,
            payload:{data:[]},
          });

        return getData(FETCH_PRODUCTS, PRODUCT_ERROR, url, dispatch);
    } 
}
export function getProductListSearch(data) {
    const url = '/ws_get_products_list.php?function=get_products&' + data;
    return dispatch =>{
        dispatch({
            type: FETCH_PRODUCTS_SEARCH,
            payload: {data:[]},
          });

        return getData(FETCH_PRODUCTS_SEARCH, PRODUCT_ERROR, url, dispatch);
    } 
}
export function getProductDetail(data) {
    const url = '/ws_get_product_detail.php?function=get_product_details&' + data;
    return dispatch => {
        dispatch({
            type: FETCH_PRODUCT_DETAILS,
            payload: {data:[]},
          });
        getData(FETCH_PRODUCT_DETAILS, PRODUCT_ERROR, url, dispatch) }
}
export function getProductForQuickView(data) {
    const url = '/ws_get_product_detail.php?function=get_product_details&' + data;
    return dispatch => {
        dispatch({
            type: FETCH_PRODUCT_DETAILS_FOR_QUICK_VIEW,
            payload: {data:[]},
          });
          
        getData(FETCH_PRODUCT_DETAILS_FOR_QUICK_VIEW, PRODUCT_ERROR, url, dispatch) }
}
export function getComboProductDetail(data) {
    const url = '/ws_get_combo_detail.php?function=get_combo_details&' + data;
    return dispatch => getData(FETCH_COMBO_PRODUCT_DETAILS, PRODUCT_ERROR, url, dispatch);
}
export function productFilter(data) {
    const url = '/ws_get_product_filters.php?function=get_filters&' + data;
    return dispatch => {
        dispatch({
            type: FETCH_PRODUCT_FILTERS,
            payload: {data:[]},
          });
       return getData(FETCH_PRODUCT_FILTERS, PRODUCT_ERROR, url, dispatch);
    }
}
export function getProductReview(data) {
    const url = '/ws_get_product_reviews.php?function=product_reviews_list&' + data;
    return dispatch => getData(GET_PRODUCT_REVIEW, PRODUCT_ERROR, url, dispatch);
}
export function addProductReview(data) {
    const url = '/ws_get_product_reviews.php?function=product_reviews_add&' + data;
    // return dispatch => {
    //     dispatch({
    //         type: AJAX_REQUEST_PROCESSING,
    //         payload: ''
    //       });
    //     return getDataAsycPromise(url)
    //         .then((response) => {
    //             dispatch({
    //                 type: ADD_PRODUCT_REVIEW,
    //                 payload: response.data,
    //             });
    //             responseHandler(response.data, dispatch)
    //             return response;
    //         })
    //         .catch((error) => {
    //             errorHandler(dispatch, error.response, PRODUCT_ERROR);
    //             throw(error);
    //         })
    // }
    return dispatch => getWithMsg(ADD_PRODUCT_REVIEW, PRODUCT_ERROR, url, dispatch);
}

/* Cart */
export function addToCart1(data) {
    const url = '/ws_add_to_cart.php?function=add_to_cart&' + data;
    return dispatch => getWithMsg(ADD_PRODUCT_TO_CART, PRODUCT_ERROR, url, dispatch);
}

export function clearStateSearch() {

    return dispatch =>{
        dispatch({
            type: FETCH_PRODUCTS_SEARCH,
            payload: {data:[]},
          });
    } 
}

export function addToCart(data){
    const url = '/ws_add_to_cart.php?function=add_to_cart&' + data;
    return dispatch => {
        dispatch({
            type: AJAX_REQUEST_PROCESSING,
            payload: ''
          });
        return getDataAsycPromise(url)
            .then((response) => {
                dispatch({
                    type: ADD_PRODUCT_TO_CART,
                    payload: response.data,
                });
                responseHandler(response.data, dispatch)
                return response;
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, PRODUCT_ERROR);
                throw(error);
            })
    }
}
export function updateCart(data){
    const url = '/ws_update_cart.php?function=update_cart&' + data;
    return dispatch => {
        return getDataAsycPromise(url)
            .then((response) => {
                dispatch({
                    type: REMOVE_CART_ITEM,
                    payload: response.data,
                });
                responseHandler(response.data, dispatch)
                return response;
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, PRODUCT_ERROR);
                throw(error);
            })
    }
}


// export function updateCart(data) {
//     const url = '/ws_update_cart.php?function=update_cart&' + data;
//     return dispatch => getWithMsg(REMOVE_CART_ITEM, PRODUCT_ERROR, url, dispatch);
// }
export function getCartData(data) {
    let url = ''
    if(data) {
        url = '/ws_get_cart_data.php?function=get_cart_data&'+data;
    } else {
      url = '/ws_get_cart_data.php?function=get_cart_data&';
    }
    
    return dispatch => {
        dispatch({
            type: GET_CART_ITEMS,
            payload: {data:[]}
          });
          dispatch({
            type: ORDER_ERROR,
            payload: {isupdated:false},
          });
         return getData(GET_CART_ITEMS, PRODUCT_ERROR, url, dispatch);
    } 
}

/* wishlist */
export function addToWishList(data) {
    const url = '/ws_add_to_wishlist.php?function=add_to_wishlist&' + data;
    return dispatch => {
        dispatch({
            type: AJAX_REQUEST_PROCESSING,
            payload: ''
          });
        return getDataAsycPromise(url)
            .then((response) => {
                dispatch({
                    type: ADD_PRODUCT_TO_WISHLIST,
                    payload: response.data,
                });
                responseHandler(response.data, dispatch)
                return response;
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, PRODUCT_ERROR);
                throw(error);
            })
    }
}


export function getWishList(data) {
    const url = '/ws_get_my_wishlist.php?function=get_my_wishlist&' + data;
    return dispatch => getData(GET_WISHLIST_ITEMS, PRODUCT_ERROR, url, dispatch);
}
export function timeSlot(data) {
    const url = '/ws_get_cart_data.php?function=get_delivery_slot_options&' + data;
    return dispatch => getData(TIME_SLOT, PRODUCT_ERROR, url, dispatch);
}
export function removeWishList(data) {
    const url = '/ws_remove_from_wishlist.php?function=remove_from_wishlist&' + data;
    return dispatch => {
        dispatch({
            type: AJAX_REQUEST_PROCESSING,
            payload: ''
          });
        return getDataAsycPromise(url)
            .then((response) => {
                dispatch({
                    type: REMOVE_WISHLIST_ITEM,
                    payload: response.data,
                });
                responseHandler(response.data, dispatch)
                return response;
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, PRODUCT_ERROR);
                throw(error);
            })
    }
}


export function validatePostcode(zipcode){
    const url = '/ws_get_cart_data.php?function=validate_postcode&postcode='+zipcode;
    return dispatch => getData(FETCH_ZIPCODE, PRODUCT_ERROR, url, dispatch);
}
export function fetchCartAndWihslistCount(){
    const url = '/ws_get_cart_wishlist_total_items.php?function=get_cart_total_items&';
    return dispatch => getData(FETCH_CART_COUNT, PRODUCT_ERROR, url, dispatch);
}



// product new in 
export function fetchProductJustArrived(data){
    const url = '/ws_get_products_list.php?function=new_in&'+data;
    return dispatch => getData(FETCH_PRODUCTS_JUST_ARRIVED, PRODUCT_ERROR, url, dispatch);
}