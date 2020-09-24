import React from 'react';
import $ from "jquery";
import Countdown from './countdown'
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subscribe } from '../actions/common';
import { objectToQueryString } from '../common/common';
class Footer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        model: false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.saveCookies = this.saveCookies.bind(this);
      
    }
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
        event.preventDefault();
        let form = new FormData();
        form.append('email', this.state.email);
        this.props.subscribe(form)
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.petitionData) {
        this.setState({
          email: ''
        }); 
      }
  }
 saveCookies() {
 localStorage.setItem('cookies_save', true)
 this.setState({
  cookies_save: true
});
}
  
    componentDidMount() {
      $("html, body").animate({ scrollTop: 0 }, 1);
    }
  
  scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, 600);    
  }

  render() {
    let catelist = JSON.parse(localStorage.getItem('categories'))
    return (
      <React.Fragment>
       {/* OPEN footer */}
<footer className="footer"> 
  <div className="footer-newsletter">
    <div className="container">
      <form className="newsletter-form" onSubmit={this.handleSubmit}>
      
        <label className="newsletter-label"><i className="fa fa-paper-plane" aria-hidden="true" /> <span>SIGNUP to NEWSLETTER</span></label>
        <div className="form-group">
        <input autoComplete="off" required className="form-control"   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  type="email" name="email"  placeholder="Enter Your Email Address" onChange={this.handleInputChange} value={this.state.email}  />
          <input type="submit" defaultValue="submit" className="btn btn-default submit-btn" />
        </div>
      </form>
      <div className="footer-social-icons">
        <span>Keep in touch</span>
        <ul className="footer-social">
          <li><a href="https://twitter.com/SurreyWhales?lang=en" target="_blank"><i className="fa fa-twitter"  /></a></li>
          <li><a href="https://www.facebook.com/surrey.whales" target="_blank"><i className="fa fa-facebook"  /></a></li>
          <li><a href="https://www.instagram.com/surreywhales/" target="_blank" ><i className="fa fa-instagram" /></a></li>
          <li><a href="https://www.pinterest.com/infosurrey/" target="_blank"><i className="fa fa-pinterest"  /></a></li>
        </ul>
      </div>
    </div>
  </div> 
  <div className="footer-top">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-3 col-xs-12 footer-address">
          
          <a target="_blank" href="https://ssl.comodo.com"><br/>
          <img src="/../images/comodo-seal.png" alt="Comodo Trusted Site Seal" width="113" height="59" style={{"border": "0px"}} /></a><br/> <span style={{"fontWeight":"bold", "fontSize":"7pt"}}>
          {/* <a target="_blank" href="https://ssl.comodo.com" >SSL Certificate</a> */}
          </span><br/>
          
        </div>
        <div className="col-md-3 col-sm-3 col-xs-4 footer-links">
          <h3>CATEGORIES</h3>
          
          <ul>
          {
                    catelist !== null ?
                      catelist.map(function (cate, index) {
                        return (
                          <li className="p-b-10" key={index}>
                            <span className="links-li" key={index}>
                              <Link className="stext-107 cl7 hov-cl1 trans-04" to={"/products?cat_id=" + cate.id}>{cate.name}</Link>
                            </span>
                          </li>
                        )
                      }) : null
                  }
          </ul>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-4 footer-links">
          <h3>HELP</h3>
          <ul>
            <li><Link to="/aboutus" onClick={this.scrollToTop}>  About Us</Link></li>
            <li><Link to="/contactus" onClick={this.scrollToTop}>Contact Us</Link></li>
            <li><Link to="/faqs" onClick={this.scrollToTop}>FAQs</Link></li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-4 footer-links">
          <h3>INFORMATION</h3>
          <ul>
          <li><Link to="/termsandconditions" onClick={this.scrollToTop}>Terms &amp; Conditions</Link></li>
          <li><Link to="/privacypolicy" onClick={this.scrollToTop}>Privacy Policy</Link></li>
          <li><Link to="/awards" onClick={this.scrollToTop}>Awards</Link></li>
          <li><Link to="/mission" onClick={this.scrollToTop}>Eco Mission</Link></li>
          <li><Link to="/ecoambassador" onClick={this.scrollToTop}>Eco Ambassador</Link></li>
          {/* <li><Link to="/ecoambassador" onClick={this.scrollToTop}>Eco Mission </Link></li> */}
          <li><Link to="/returnrefundpolicy" onClick={this.scrollToTop}>Return and Refunds</Link></li>
          {/* <li><Link to="/requestrefund" onClick={this.scrollToTop}>Request Refund</Link></li> */}
          </ul>
        </div>
      </div>
    </div>
  </div>

  <section className="footer-bottom">
    <div className="container">
    
      <span className="copyright">Copyright © cacozi limited.s All rights reserved. | REGISTERED IN ENGLAND & WALES, COMPANY NUMBER <b>11150929</b></span>    
    </div>
    { !localStorage.getItem('cookies_save')? 
    <div id="tweCookie"><span className="text">This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.</span>
    <a onClick={this.saveCookies} className="banner-accept" href="javascript:void(0)" style={{background: '#ff910e'}}>Accept</a>
    </div>  
    : null}
  </section>       
</footer>
{/* END footer */}

      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: bindActionCreators(subscribe, dispatch)
  }
}
function mapStateToProps(state) {
  return {
    subscribData: state.common.subscribe,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);