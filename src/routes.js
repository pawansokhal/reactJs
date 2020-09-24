import React from 'react';
import { Route, IndexRoute, /*Redirect*/ } from 'react-router';
import App from './App';
import Home from './components/home/home';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import SignUp from './components/auth/signup';
import Resetpassword from './components/auth/resetpassword';
import Address from './components/auth/address';
import Profile from './components/auth/profile';
import Preferences from './components/auth/preferences';

import ProductsList from './components/products/productslist';
import Productdetail from './components/products/productdetail';
import Combodetail from './components/products/combodetail';
 import Catgories from './components/home/cat';
 import Catmodelfirstlevel from './components/home/catmodelfirstlevel';
 

import Wishlist from './components/products/wishlist';
import Cart from './components/products/cart';
import Order from './components/orders/orders';
import Thanks from './components/orders/thanks';

import Orderdetail from './components/orders/orderdetail';
import BuffetOrder from './components/orders/buffetOrder';
import BuffetOrderDetail from './components/orders/buffetOrderDetail';



// static pages
import Barexchnge from './components/pages/barexchnge';
import Buffet from './components/pages/buffet';
import Favorites from './components/pages/favorites';
import Offers from './components/pages/offers';
import Lpoints from './components/pages/lpoints';
import NewIn from './components/pages/newin';
import Brands from './components/pages/brands';
import Aboutus from './components/pages/aboutus';
import Mission from './components/pages/mission';
import Awards from './components/pages/awards';
import Ecoambassador from './components/pages/ecoambassador';
import Juniorecoambassador from './components/pages/juniorecoambassador';

import Contactus from './components/pages/contactus';
import Requestrefund from './components/pages/requestrefund';
import Faqs from './components/pages/faqs';
import PrivacyPolicy from './components/pages/privacy_policy';
import ReturnRefundPolicy from './components/pages/return_refund_policy';
import TermsAndConditions from './components/pages/terms_and_conditions';
import JuniorEcoambAssadorForm from './components/pages/juniorecoambassadorform';
import EcoambAssadorForm from './components/pages/ecoambassadorform';
import Freerecycling from './components/pages/freerecycling';
import Comingsoon from './components/pages/comingsoon';
import ComingsoonPlasticfree from './components/pages/commingsoonplasticfree';     
import Over60 from './components/pages/over60';
import Petition from './components/pages/petition';
import Plasticfree from './components/pages/plasticfree';
import Petitionform from './components/pages/petitionform';
import Homehub from './components/pages/homehub';
import Ecohmission from './components/pages/ecohmission';
import Conciergeservices from './components/pages/conciergeservices';


import RequireAuth from './components/auth/require_auth';


export default (
  <Route path="/" component={App}>
	  <IndexRoute component={Home} />
    <Route path='register' component={SignUp} />
    <Route path='login' component={Login} />
    <Route path='logout' component={RequireAuth(Logout)} />
    <Route path='/profile' component={RequireAuth(Profile)} />
    <Route path='/preferences' component={RequireAuth(Preferences)} />
    
    <Route path='resetpassword' component={RequireAuth(Resetpassword)} />
    <Route path='categories(/:id)' component={Catgories} />
    <Route path='topcate(/:id)' component={Catmodelfirstlevel} />
    
    <Route path='address' component={RequireAuth(Address)} />
    <Route path='wishlist' component={RequireAuth(Wishlist)} />
    <Route path='products(/:id)' component={ProductsList} />
    <Route path='product/:slug/:id' component={Productdetail} />
    <Route path='combo/:slug/:id' component={Combodetail} />
    <Route path='cart' component={Cart} anonymous={true}/>
    <Route path='orders' component={RequireAuth(Order)} />
    
    <Route path='orderdetail/:id' component={RequireAuth(Orderdetail)} />
    <Route path='thanks' component={RequireAuth(Thanks)} />
    <Route path='buffetorder' component={RequireAuth(BuffetOrder)} />
    <Route path='buffetorderdetail' component={RequireAuth(BuffetOrderDetail)} />
    
    
    {/* Pages */}
    <Route path='barexchnge' component={Barexchnge} />
    <Route path='buffet' component={Buffet} />
    <Route path='favorites' component={RequireAuth(Favorites)} />
    <Route path='offers' component={Offers} />
    <Route path='lpoints' component={Lpoints} />
    <Route path='newin' component={NewIn} />
    <Route path='brands' component={Brands} />
    <Route path='aboutus' component={Aboutus} />
    <Route path='mission' component={Mission} />
    <Route path='awards' component={Awards} />
    <Route path='ecoambassador' component={Ecoambassador} />
    <Route path='juniorecoambassador' component={Juniorecoambassador} />
    <Route path='contactus' component={Contactus} />
    <Route path='requestrefund' component={Requestrefund} />
    <Route path='faqs' component={Faqs} />
    <Route path='privacypolicy' component={PrivacyPolicy} />
    <Route path='returnrefundpolicy' component={ReturnRefundPolicy} />
    <Route path='termsandconditions' component={TermsAndConditions} />
    <Route path='termsandconditions' component={TermsAndConditions} />
    <Route path='juniorecoambassadorform' component={JuniorEcoambAssadorForm} />
    <Route path='ecoambassadorform' component={EcoambAssadorForm} />
    <Route path='freerecycling' component={Freerecycling} />
    <Route path='comingsoon' component={Comingsoon} />
    <Route path='comingsoonplasticfree(/:id)' component={ComingsoonPlasticfree} />
    
    <Route path='over60' component={Over60} />
    <Route path='petition' component={Petition} />
    <Route path='plasticfree' component={Plasticfree} />
    <Route path='homehub' component={Homehub} />
    <Route path='ecohmission' component={Ecohmission} />
    
    <Route path='petitionform' component={Petitionform} />
    <Route path='conciergeservices' component={Conciergeservices} />
    
    {/* <Route path='404' exact={true} component={NoPageFound} /> */}
    {/*<Route path='*' exact={true} component={NoPageFound} />*/}
    {/* <Redirect from='*' to='/404' /> */}
  </Route>
);