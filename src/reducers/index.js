import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import home from './home';
import ajaxrequest from './ajax_requests';
import product from './product';
import common from './common';
import orders from './orders';
import pages from './pages';
import barexchanges from './barexchanges';


const rootReducer = combineReducers({
  auth: authReducer,
  home: home,
  ajaxrequest: ajaxrequest,
  common: common,
  product: product,
  orders: orders,
  pages: pages,
  barexchanges: barexchanges
});

export default rootReducer;
