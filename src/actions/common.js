import { getData, postSendGridData, errorHandler, getDataAsycPromise } from '.';
import { FETCH_CATEGORIES,CATEGORY_ERROR, FETCH_CHILD_CATEGORIES, FETCH_ALL_CATEGORIES, COMMON_ERRORS, FETCH_ALL_BRANDS,
         FETCH_WISHLIST_COUNT,CONTACT_US,  FETCH_KEYWORD_SEARCH, AJAX_REQUEST_PROCESSING, CATALOGUES_LIST,
         ECOAMBASSADOR, JUNIOR_ECO_AMBASSADOR ,HOME_HUB,PETITION,SUBSCRIBE
        } from './types';

//= ===============================
// Product actions
//= ===============================
export function fetchCategories(data){
    const url = '/ws_get_product_categoies.php?function=get_categories&'+data;
    return dispatch => getData(FETCH_CATEGORIES, CATEGORY_ERROR, url, dispatch);
}

export function fetchCatalogueslist(){
    const url = '/ws_get_catalogues.php?function=catalogues_list&';
    return dispatch => getData(CATALOGUES_LIST, CATEGORY_ERROR, url, dispatch);
}


export function fetchChildCategories(category_id){
    const url = '/categories/'+category_id+'/child';
    return dispatch => getData(FETCH_CHILD_CATEGORIES, CATEGORY_ERROR, url, dispatch);
}
export function ecoAmbassador(data){
    const url = '/ecoambessdors.php';
    return dispatch => postSendGridData(ECOAMBASSADOR, CATEGORY_ERROR, url, dispatch,data);
}
export function juniorEcoAmbassador(data){
    const url = '/junior-ecoambessdors.php';
    return dispatch => postSendGridData(JUNIOR_ECO_AMBASSADOR, CATEGORY_ERROR, url, dispatch, data);
}
export function contactus(data){
    const url = '/reachus.php';
    return dispatch => postSendGridData(CONTACT_US, CATEGORY_ERROR, url, dispatch, data);
}

export function homehub(data){
    const url = '/homehub.php';
    return dispatch => postSendGridData(HOME_HUB, CATEGORY_ERROR, url, dispatch, data);
}
export function petition(data){
    const url = '/petition.php';
    return dispatch => postSendGridData(PETITION, CATEGORY_ERROR, url, dispatch, data);
}
export function subscribe(data){
    const url = '/subscribe.php';
    return dispatch => postSendGridData(SUBSCRIBE, CATEGORY_ERROR, url, dispatch, data);
}

export function fetchAllCategories() {
    const url = '/categories?number_of_records=0&level=1,2,3';
    return dispatch => getData(FETCH_ALL_CATEGORIES, CATEGORY_ERROR, url, dispatch);
}


export function fetchBrands(){
    const url = '/ws_get_product_brands.php?function=product_brands_list';
    return dispatch => getData(FETCH_ALL_BRANDS, COMMON_ERRORS,  url, dispatch);
}

export function fetchWishlistCount(isAuthenticated = true){
    const url = '/wishlists/count';
    return dispatch => getData(FETCH_WISHLIST_COUNT, COMMON_ERRORS, isAuthenticated, url, dispatch);
}


export function fetchKeywordProduct(keyword){
    const url = '/elasticsearch?q='+keyword;
    // return dispatch => getData(FETCH_KEYWORD_SEARCH, COMMON_ERRORS, false, url, dispatch);
    return dispatch => {
        dispatch({
            type: AJAX_REQUEST_PROCESSING,
            payload: ''
          });
        return getDataAsycPromise(FETCH_KEYWORD_SEARCH, COMMON_ERRORS, false, url, dispatch)
        .then((response) => {
            dispatch({
                type: FETCH_KEYWORD_SEARCH,
                payload: response.data,
            });
            return response;
        })
        .catch((error) => {
            errorHandler(dispatch, error, COMMON_ERRORS);
            throw(error);
        })
    }
}

