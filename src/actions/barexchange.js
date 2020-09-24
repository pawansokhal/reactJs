import { getData, getDataAsycPromise,  errorHandler, responseHandler} from '.';
import { 
    BAREXCHANGES_CATEGORIES,
    BAREXCHANGES_PRODUCTS,
    BAREXCHANGES_PRODUCTS_ADD_TO_FAVOURATE,
BAREXCHANGES_PRODUCTS_REMOVE_TO_FAVOURITE,
BAREXCHANGES_PRODUCTS_LIST_FAVOURITE,
    BAREXCHANGES_ERROR,
    AJAX_REQUEST_PROCESSING
} from './types';

//= ===============================
// Jobs actions
//= ===============================


export function fetchBarexchangeCategoriesList(){
    const url = '/ws_barexchange.php?function=barexchange_categories_list';
    return dispatch => getData(BAREXCHANGES_CATEGORIES, BAREXCHANGES_ERROR, url, dispatch);
}

export function fetchBarexchangeProducts(data){
    const url = '/ws_barexchange.php?function=barexchange_markets_list_all&'+data;
    return dispatch => getData(BAREXCHANGES_PRODUCTS, BAREXCHANGES_ERROR, url, dispatch);
}

export function addFavouritesProducts(data){
    const url = '/ws_barexchange.php?function=add_to_favourites&'+ data;
        return dispatch => {
            dispatch({
                type: AJAX_REQUEST_PROCESSING,
                payload: ''
              });
            return getDataAsycPromise(url)
                .then((response) => {
                    dispatch({
                        type: BAREXCHANGES_PRODUCTS_ADD_TO_FAVOURATE,
                        payload: response.data,
                    });
                    responseHandler(response.data, dispatch)
                    return response;
                })
                .catch((error) => {
                    errorHandler(dispatch, error.response, BAREXCHANGES_ERROR);
                    throw(error);
                })
        }
    }

    export function removeFavouritesProducts(data){
        const url = '/ws_barexchange.php?function=remove_from_favourites&'+ data;
            return dispatch => {
                return getDataAsycPromise(url)
                    .then((response) => {
                        dispatch({
                            type: BAREXCHANGES_PRODUCTS_REMOVE_TO_FAVOURITE,
                            payload: response.data,
                        });
                        responseHandler(response.data, dispatch)
                        return response;
                    })
                    .catch((error) => {
                        errorHandler(dispatch, error.response, BAREXCHANGES_ERROR);
                        throw(error);
                    })
            }
        }

export function listFavouritesProducts(){
    const url = '/ws_barexchange.php?function=barexchange_markets_list_favourites&';
    return dispatch => getData(BAREXCHANGES_PRODUCTS_LIST_FAVOURITE, BAREXCHANGES_ERROR, url, dispatch);
}


// export function fetchCategories(){
//     const url = '/categories';
//     return dispatch => getData(FETCH_CATEGORIES, HOME_ERROR, url, dispatch);
// }

