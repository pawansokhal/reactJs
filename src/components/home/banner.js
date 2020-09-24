import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { objectToQueryString } from '../../common/common';
class Banners extends React.Component {
    render() {
        let banners = [];
        if (this.props.banners.hasOwnProperty('data')) {
            banners = this.props.banners.data
        }
        let  formData = {}
        return (
            // <section id="slider" className="slider-sec content-sec">
            //     <div className="container">
            //         <div className="row"> 
            //             <div id="bannerCarousel" className="carousel slide " data-ride="carousel">
            //                 <ol className="carousel-indicators">
            //                 {
            //                     banners.map((item, index) => {
            //                         return (
            //                             <li key={index} data-target="#bannerCarousel" data-slide-to={index} className={(index === 0 ? "active" : "")} ></li>
            //                         )
            //                     })
            //                 }
            //                 </ol>
            //                 <div className="carousel-inner" style={{height:'500px !important'}}>
            //                     {
            //                         banners.map((item, index) => {
            //                             formData = {
            //                                 cat_id: item.cat_id === "0" ? null : item.cat_id,
            //                                 brand_ids: item.brand_ids === "0" ? null : item.brand_ids,
            //                                 min_price: parseInt(item.min_price, 10),
            //                                 max_price: parseInt(item.max_price, 10)
            //                             }

            //                             return (
            //                                 <div key={index} className={(index === 0) ? "carousel-item active" : "carousel-item"}>
            //                                 <Link to={item.item_type === 'product_list' ? "products?" + objectToQueryString(formData)  : "product/" +  item.slug + "/"+ item.item_id }>
            //                                 <img src={item.banner_image} alt={"banner"+index} className="first-slide"/>
            //                                 </Link>
            //                                 </div>
            //                             )
            //                         })
            //                     }
            //                 </div>
            //                 <a className="carousel-control-prev" href="#bannerCarousel" role="button" data-slide="prev">
            //                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            //                     <span className="sr-only">Previous</span>
            //                 </a>
            //                 <a className="carousel-control-next" href="#bannerCarousel" role="button" data-slide="next">
            //                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
            //                     <span className="sr-only">Next</span>
            //                 </a>
            //             </div>    
            //         </div>
            //     </div>
            // </section>


<section id="slider" className="slider-sec content-sec">
                <div className="container">
                    <div className="row"> 
                        <div id="bannerCarousel" className="carousel slide " data-ride="carousel">
                            <ol className="carousel-indicators">
                            {
                                banners.map((item, index) => {
                                    return (
                                        <li key={index} data-target="#bannerCarousel" data-slide-to={index} className={(index === 0 ? "active" : "")} ></li>
                                    )
                                })
                            }
                            </ol>
                            <div className="carousel-inner" style={{height:'500px !important'}}>
                                {
                                    banners.map((item, index) => {
                                        formData = {
                                            cat_id: item.cat_id === "0" ? null : item.cat_id,
                                            brand_ids: item.brand_ids === "0" ? null : item.brand_ids,
                                            min_price: parseInt(item.min_price, 10),
                                            max_price: parseInt(item.max_price, 10)
                                        }

                                        return (
                                            <div key={index} className={(index === 0) ? "carousel-item active" : "carousel-item"}>
                                            <Link to={item.item_type === 'product_list' ? "products?" + objectToQueryString(formData)  : "product/" +  item.slug + "/"+ item.item_id }>
                                            <img src={item.banner_image} alt={"banner"+index} className="first-slide"/>
                                            </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <a className="carousel-control-prev" href="#bannerCarousel" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#bannerCarousel" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>    
                    </div>
                </div>
            </section>
        )
    }
}

Banners.propTypes = {
    banners: PropTypes.any.isRequired,
}
export default Banners;

