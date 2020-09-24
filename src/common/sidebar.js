import React from 'react';
import { Link } from 'react-router';
/*eslint-disable no-script-url*/
class SideBar extends React.Component {

  render() {
    return (
      <React.Fragment>
        <aside className="wrap-sidebar js-sidebar">
          <div className="s-full js-hide-sidebar" />
          <div className="sidebar flex-col-l p-t-22 p-b-25">
            <div className="flex-r w-full p-b-30 p-r-27">
              <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-sidebar">
                <i className="zmdi zmdi-close" />
              </div>
            </div>
            <div className="sidebar-content flex-w w-full p-lr-65 js-pscroll">
              <ul className="sidebar-link w-full">
                <li className="p-b-13">
                  <Link to="/profile" className="stext-102 cl2 hov-cl1 trans-04 close-profile">My Profile</Link>
                </li>
                <li className="p-b-13">
                  <Link to="/orders" className="stext-102 cl2 hov-cl1 trans-04 close-profile">My Orders</Link>
                </li>
                {/* <li className="p-b-13">
                  <Link to="/buffetorder" className="stext-102 cl2 hov-cl1 trans-04 close-profile">Buffet Orders</Link>
                </li> */}
                <li className="p-b-13">
                  <Link to="/lpoints" className="stext-102 cl2 hov-cl1 trans-04 close-profile">
                    L Points <br />
                    {/* <small>3201</small> */}
                  </Link>
                </li>
                <li className="p-b-13">
                  <Link to="/address" className="stext-102 cl2 hov-cl1 trans-04 close-profile"> Addresses</Link>
                </li>
                <li className="p-b-13">
                  <Link to="/wishlist" className="stext-102 cl2 hov-cl1 trans-04 close-profile">My Wishlist</Link>
                </li>
                <li className="p-b-13">
                  <Link to="/resetpassword" className="stext-102 cl2 hov-cl1 trans-04 close-profile"> Change Password</Link>
                </li>
              </ul>
              <button className="close-profile flex-c-m stext-101 cl0 size-111 bg1 bor1 hov-btn1 p-lr-15 trans-04 " onClick={this.props.handleSubmit}> Logout </button>
            </div>
            <div className="flex-c w-full p-b-30 p-t-27 p-l-27 p-r-27">
            </div>
          </div>
        </aside>
      </React.Fragment>
    )
  }
}
export default (SideBar);