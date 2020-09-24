import { getData } from '.';
import { L_POINT,L_POINT_BOTEL_SELECT, L_POINT_ERROR, OFFER_PAGE, PAGES_ERROR } from './types';

//= ===============================
// Product actionspage
//= ===============================
export function getLpoint(){
    const url = '/ws_my_account_lpoints.php?function=get_my_lpoints&';
    return dispatch => getData(L_POINT, L_POINT_ERROR, url, dispatch);
}

export function selectLpointProduct(data){
    const url = '/ws_my_account_lpoints.php?function=choose_favourite_bottle&'+data;
    return dispatch => getData(L_POINT_BOTEL_SELECT, L_POINT_ERROR, url, dispatch);
}

export function offerPage(){
    const url = '/ws_offers.php?function=offers_list&';
    return dispatch => getData(OFFER_PAGE, PAGES_ERROR, url, dispatch);
}
