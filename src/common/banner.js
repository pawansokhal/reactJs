import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { Link } from 'react-router';
import { objectToQueryString } from './common';
import ImageGallery from 'react-image-gallery';
class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    let banners = [];
    if (this.props.banners.hasOwnProperty('data')) {
        banners = this.props.banners.data
    }
    let  formData = {}
    return (
        <Slider autoplay={1000} infinite={true} onSlideChange={event => console.log(event.slideIndex)} >
       {
                                    banners.map((item, index) => {
                                        console.log('index', index)
                                        return (
                                         <div
                                            key={index}
                                            style={{ background: `url('${item.banner_image}') no-repeat center center` }}
                                        >
                                            
                                            <Link to={item.item_type === 'product_list' ? "products?" + objectToQueryString(formData)  : "product/" +  item.slug + "/"+ item.item_id }>
                                            <div className="center">
                                              
                                              
                                            </div>
                                            </Link>
                                            </div>
                                        )
                                    })
                                }
      </Slider>
    );
  }
}
export default SimpleSlider;