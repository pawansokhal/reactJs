import { getData } from './index';
import { 
    FETCH_BRANDS,
    FETCH_BANNERS,
    HOME_ERROR } from './types';

//= ===============================
// Jobs actions
//= ===============================


export function fetchBanners(){
    const url = '/ws_get_home_page_slider.php?function=get_home_page_slider';
    return dispatch => getData(FETCH_BANNERS, HOME_ERROR, url, dispatch);
}




export function fetchBrands(){
    const url = '/ws_get_product_brands.php?function=get_brands';
    return dispatch => getData(FETCH_BRANDS, HOME_ERROR, url, dispatch);
}

// export function fetchCategories(){
//     const url = '/categories';
//     return dispatch => getData(FETCH_CATEGORIES, HOME_ERROR, url, dispatch);
// }

