import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { petition } from '../../actions/common';
import { objectToQueryString } from '../../common/common';
class Petition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      model: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
      form.append('first_name', this.state.first_name);
      form.append('last_name', this.state.last_name);
      form.append('email', this.state.email);
      this.props.petition(form)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.petitionData) {
      this.setState({
        first_name: '',
        last_name: '',
        email: ''
      }); 
    }
}

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 1);
  }

    render(){
    
        
        return (
          <section className="ambassador-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
          <div className="container">
            <div className="about-sec-main">
              <h2 className="inner-title">Sign the petition</h2>
              <h3 className="m-b-15">PETITION DEMANDING THAT SINGLE USE PLASTIC WHICH IS NOW INDESTRUCTIBLE BE BIODEGRADABLE</h3>
              <div className="eco-ambassador-img">
                <img src="images/p.jpg" alt="eco ambassador" />	
              </div>		  
              <p>Every year tons of plastic, including microbeads, litter beaches and pollute the ocean and the problem get worse every year. Made from petroleum, it fragments and lasts forever. Mother birds feed it to their chicks who die and degrade, but the plastic that filled their stomachs endures to be fed to other birds. In the oceans unsuspecting whales, sea turtles and even the smallest fish are ingesting it. Soon we, too, will be eating it. There is no need for consumer single use plastic to last forever! We must demand that products are made that are not petroleum-based and do not last forever. We must say "no thank you" when offered a plastic straw or plastic bag. We must carry our own containers for water & coffee and our own bag.</p>
              <div className="animation-form ">
            <form onSubmit={this.handleSubmit}>
              <div className="form-box ">
                <div className="form-group">
                  <input type="text" required name="first_name" className="form-control" placeholder="First Name" onChange={this.handleInputChange} value={this.state.first_name}/>
                </div>
                <div className="form-group">
                  <input type="text" required  name="last_name" className="form-control" placeholder="Last Name" onChange={this.handleInputChange} value={this.state.last_name}/>
                </div>
                <div className="form-group last-input">
                <input autoComplete="off" required className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" name="email" placeholder="Your Email Address" onChange={this.handleInputChange} value={this.state.email} />
                </div>
                </div>
              {/* <div className="checkbox">
                <label><input type="checkbox" /> Display my name and comment on this petition</label>
              </div> */}
              <button type="submit" className="btn btn-default"><i className="fa fa-lock" aria-hidden="true" /> Sign this petition</button>
            </form>
            {/* <p>By signing, you accept Change.org’s Terms of Service and Privacy Policy, and agree to receive occasional emails about campaigns on Change.org. You can unsubscribe at any time.</p>  */}
            </div>
              {/* <Link className="btn btn-default submit-btn ecoambassadobutton" to="/petitionform"><b>Sign the petition</b></Link> */}
              <hr />
              </div>  
          </div>
        </section>
        
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    petition: bindActionCreators(petition, dispatch)
  }
}
function mapStateToProps(state) {
  return {
    petitionData: state.common.petition,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Petition);