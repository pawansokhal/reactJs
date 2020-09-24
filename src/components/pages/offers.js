import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { offerPage } from '../../actions/pages';
/*eslint-disable no-script-url*/
class OfferPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isOpenLightbox: false,
      model: false
    }
  }

  hideModal() {
    this.setState({ model: false })
  }
  componentWillMount() {
    this.props.offerPage()
  }

  render() {
    let offers = [];
    if (this.props.offers.hasOwnProperty('data')) {
      offers = this.props.offers.data
    }



    return (
      <div>
        <section className="offer-boxes-sec m-t-3``0 ">{/*OPEN slider-sec */}
          <div className="container">
          <div className="about-sec-main">
              <h2 className="inner-title">Offer</h2>
          </div>
          </div>
        </section>    
        <section id="section" className="offer-boxes-sec  p-b-50 m-t-50">{/*OPEN slider-sec */}
          <div className="container">
            <div className="row">
              {offers.length > 0 ?
                offers.map(function (product, index) {
                  return (
                    <div className="col-md-4 col-sm-4 col-xs-12 m-b-30 offer-boxes" key={Math.random()}>
                      <div className="product-box">
                        <div className="product-img">
                          <img src={product.banner_image_url} alt="Offer Img" /></div>
                          <div className="product-description">
                            <h3 className="product-title">{product.name}</h3>
                          </div>
                        </div>
                      </div>
                    )
                }) : null
              }
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    offerPage: bindActionCreators(offerPage, dispatch)
  }
}
function mapStateToProps(state) {
  return {
    offers: state.pages.offers,
    isupdated: state.pages.isupdated
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);