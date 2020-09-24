import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBrands } from '../../actions/common';
import { Link } from 'react-router';
import { ucfirst } from '../../common/common'
class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.scrollBy = this.scrollBy.bind(this);
    }


    componentWillMount() {
        this.props.fetchBrands();
    }
    scrollBy(e) {
        const id = e.target.dataset.id
        
	
            // //On Scroll Functionality
            // $(window).scroll( () => {
            //     var windowTop = $(window).scrollTop();
            //     windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
            //     windowTop > 100 ? $('ul').css('top','80px') : $('ul').css('top','160px');
            // });
            
            // //Smooth Scrolling Using Navigation Menu
            // $('a[href*="#"]').on('click', function(e){
            //     $('html,body').animate({
            //         scrollTop: $($(this).attr('href')).offset().top - 70
            //     },500);
            //     e.preventDefault();
            // });
        
    }

    componentDidMount() {

        //   //On Scroll Functionality
        //   $(window).scroll( () => {
        //     var windowTop = $(window).scrollTop();
        //     windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
        //     windowTop > 100 ? $('ul').css('top','80px') : $('ul').css('top','160px');
        // });
        
        // //Smooth Scrolling Using Navigation Menu
        // $('a[href*="#"]').on('click', function(e){
        //     $('html,body').animate({
        //         scrollTop: $($(this).attr('href')).offset().top - 100
        //     },500);
        //     e.preventDefault();
        // });
    }

    render() {
        const groups = {};
        if (this.props.brands.hasOwnProperty('data')) {
            const brands = this.props.brands.data
            Array.from(new Set(brands.map(item => item.name.charAt(0)))).forEach(initial => Object.assign(groups, { [initial]: brands.filter(item => (item.name.charAt(0) === initial)) }))
        }
        return (
            <div className="bg10 p-t-80 p-b-80 mob-container brands1">
                <div className="container">
                    <section id="" className="common_section">
                        <div className="page-header">
                            <h4>Find Your Favorite Brand</h4>
                        </div>
                        <div className="row" >
                            <div className="col-md-12 anchor_custom" >
                                <strong>Brand Index:</strong><ul>
                                {Object.keys(groups).map((item, index) => {
                                    return <li key={index}> <a key={index} onClick={this.scrollBy} data-id={item} href={"#" + item}>&nbsp;&nbsp;&nbsp;{ucfirst(item)}</a></li>
                                })}
                                </ul>

                                {Object.keys(groups).map((item, index) => {
                                    return (
                                        [<section key={index} id={item}>
                                        <h2 key={Math.random()} >{item}</h2>
                                        <div key={Math.random()} className="row">
                                            {groups[item].map((brand, indx) => {
                                                return (
                                                    <div key={indx} className="col-sm-3 ">
                                                        <Link to={"/products?brand_ids=" + brand.id} >{ucfirst(brand.name)}</Link>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        </section>]
                                    )
                                })}

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        brands: state.common.brands,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBrands: bindActionCreators(fetchBrands, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands);