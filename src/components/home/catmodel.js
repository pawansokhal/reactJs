import React from "react";
import { Link } from 'react-router';
import $ from "jquery";
class CatModel extends React.Component {
  componentWillMount() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  render() {
    let categoriesList= []
    if(this.props.categoriesList.hasOwnProperty('data')) {
      categoriesList = this.props.categoriesList.data
    }
    console.log('this.props.toplevel', this.props.toplevel)
    return (
      <section id="section2" className="categories-sec content-sec m-t-30 p-b-40">
      <div className="container">
      {/* <div className="palsticfree-bar">
      For <span>palstic free</span> shopping go to <strong>Surrey Whales</strong>
    </div> */}
        <div className="title-box"><h2>Categories </h2> </div>
        <div className="row">
        {this.props.toplevel?
          <div className="col-md-8 col-sm-8 col-xs-8">
            <div className="category-box all-cat-box">
              <div className="product-cat-img"><img src="../images/category-img.png" alt="all" /></div>
              <div className="bg-overlay" />
              <div className="hover-box">
                <h2>All Categories</h2>	
              </div>
            </div>
          </div>
           : null}
            {categoriesList.map(function (cate, index) {
              return( 
                
              <div className="col-md-4 col-sm-4 col-xs-4" key={index}>
                <div className="category-box">
                  <div className="product-cat-img">
                  <img src={cate.homepage_banner} alt={cate.name} />
                  {/* <img src="images/product-img3.png"  alt={cate.name}  /> */}
                  </div>
                  <div className="bg-overlay" />
                  <div className="hover-box">
                  <Link to={"categories?cat_id="+cate.id} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                    <h2> {cate.name}</h2>	
                    </Link>
                  </div>
                </div>
              </div>
              )
            })}
    </div>    
  </div>
</section>
    );
  }
}
export default CatModel;