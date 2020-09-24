 import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
class Contactus extends React.Component {
  redirectToLogin(event) {
    event.preventDefault();
    browserHistory.push({
        pathname: '/login',
        search: '',
        state: { previouspath:'/newin' }
       });
  }

    render(){
  
        return (
          <div>
          <section className=" content-sec">
            <div className="container">
              <h2 className="inner-title">Request Refund</h2>
            </div> 
          </section>
          <section className=" p-b-50 m-t-50">{/*OPEN slider-sec */}
            <div className="container">
              <div className="contact-box-main">
                <div className="contact-col-left">
                  <form>
                    <h4 className="text-center p-b-30">
                      Request Refund
                    </h4>
                    <div className="form-group">
                      <input className="form-control" type="text" name="email" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" name="msg" placeholder="Remarks" defaultValue={""} />
                    </div>
                    <button className="btn btn-default default-btn">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="contact-col-right">
                  <p>please read our policies by following the links below</p>
                </div>
              </div>
            </div>
          </section>{/*END section 1 */}
        </div>
        
        
        );
    }
}




export default(Contactus);