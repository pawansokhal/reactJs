import React from "react";
import { Link } from 'react-router';
import { makeArrayForBrandsAndCate } from '../../common/common';
import $ from "jquery";
class CatModel extends React.Component {
  constructor(props) {
    super(props)
    let cat_id = (this.props.location.query.cat_id) ? this.props.location.query.cat_id : []
    const catalogue_id = localStorage.getItem('catlogid') ? localStorage.getItem('catlogid') : "1";
    // console.log('cat_id: ', cat_id);
    // console.log('catalogue_id: ', catalogue_id);
    if(cat_id == 1510 && catalogue_id == 2){
      localStorage.setItem('catlogid', "1");
      localStorage.setItem('catlogname', "Surrey Whales");
      window.location.reload();
    }
  }
  componentWillMount() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }

  render() {
    let cat_id = (this.props.location.query.cat_id) ? this.props.location.query.cat_id : []
   
        // let isLoaded = this.state.isLoaded;
        let parentCate = [];
        let showing_in_categories = [];
    if ( localStorage.getItem('categories')) {
      parentCate = makeArrayForBrandsAndCate(JSON.parse(localStorage.getItem('categories')))
      
      if (parentCate[cat_id]) {
        showing_in_categories.push(parentCate[cat_id])
      } else {
        let categoriesList = JSON.parse(localStorage.getItem('categories'))
        categoriesList.map(item => {
          if ('subcat' in item && item.subcat.length > 0) {
            item.subcat.forEach(element => {
              if (element.id === cat_id) {
                showing_in_categories.push(element.name)
              }
            });
          }
          return showing_in_categories;
        });
      }
    }
    let categoriesList = JSON.parse(localStorage.getItem('categories'))

    // console.log('cat_id', categoriesList.find(ed=>{
    //   console.log(ed)
    // } ))
   const cat =  categoriesList.find(ed=>ed.id === cat_id);
   
    return (
    <section id="section1" className="categories-sec content-sec m-t-50 p-b-40 tesco-categories">
  <div className="container">
    <h2 className="inner-title">{showing_in_categories} </h2> 
   
    <div className="row">
      <div className="col-md-12 col-sm-12 col-xs-12 categoty-right-sec">
        <div className="row">
        { cat ? cat.subcat.map(function (catinfo, index) {
          return(
        <div className="col-md-3 col-sm-3 col-xs-3 scat" key={index}>
        <div className="category-box">
          <div className="product-cat-img">
          <img src={catinfo.image}alt={catinfo.name} />
          {/* <img src="https://www.artoftimeindia.com/wp-content/uploads/2017/01/placeholder.jpg" alt="pic" /> */}
          </div>
          <div className="bg-overlay" />
          <div className="hover-box">
            {/* <h2><a href="category.html">{catinfo.name}</a></h2>	 */}
            <Link to={"products?cat_id="+catinfo.id} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                    <h2> {catinfo.name}</h2>	
                    </Link>
          </div>
        </div>
      </div>
        
        )
        }): null}
           
        </div> 
      </div>
    </div>
  </div>
</section>

    );
  }
}
export default CatModel;