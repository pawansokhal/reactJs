import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

class SimpleSlider extends React.Component {
    render() {
        // var settings = {
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 1,
        //     slidesToScroll: 1
        // };
        let banners = [];
        if (this.props.banners.hasOwnProperty('data')) {
            banners = this.props.banners.data
        }
        let formData = {}
        return (
            banners.length ?
                // <Slider autoplay={500} duration={2000} infinite={true} >
                //     {
                //         banners.map((item, index) => {
                //             return (
                //                 <div
                //                     key={index}
                //                     // style={{ background: `url('${item.banner_image}') no-repeat center center` }}
                //                 >
                //                     <div className="center">
                //                         <div className="container">
                //                             <div className="row">
                //                                 {/* Content block end */}
                //                                 <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                //                                     {/* Wrapper for slides */}
                //                                     <div className="carousel-inner" role="listbox">
                //                                         <div className="item active">
                //                                             <div className="carousel-img"><img src={item.banner_image} alt={item.title} /></div>
                //                                             <div className="carousel-caption">
                //                                                 <h4>{item.title}</h4>
                //                                                 <h2>{item.description} </h2>
                //                                                 <Link className="shop-btn" to={item.item_type === 'product_list' ? "products?" + objectToQueryString(formData) : "product/" + item.slug + "/" + item.item_id}>
                //                                                     Shop Now </Link>
                //                                             </div>
                //                                         </div>
                //                                     </div>
                //                                 </div>
                //                             </div>
                //                         </div>
                //                     </div>
                //                 </div>
                //             )
                //         })
                //     }

                // </Slider>
                 <Slider autoplay={3000} duration={3000} infinite={true} >
                 {
                     banners.map((item, index) => {
                         return (
                             <div key={index}
                                //  style={{ background: `url('${item.banner_image}') no-repeat center center` }}
                                >
                                <img src={item.banner_image} alt={item.title} />
                            </div>         
                         )
                     })
                 }

             </Slider>

                : null
        );
    }
}
export default SimpleSlider;