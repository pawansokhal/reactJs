import React from "react";
import { Link } from 'react-router';
import { makeArrayForBrandsAndCate } from '../../common/common';
class CatModel extends React.Component {
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
          <h2 className="inner-title">
          Plastic Free
          {/* {showing_in_categories}  */}
          </h2> 
        
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



              <div className="col-md-3 col-sm-3 col-xs-3 scat">
                <div className="category-box">
                  <div className="product-cat-img">
                  <img src="/../images/bath-and-skin-care.jpg" alt="Bath & Skin Care" />
                  {/* <img src="https://www.artoftimeindia.com/wp-content/uploads/2017/01/placeholder.jpg" alt="pic" /> */}
                  </div>
                  <div className="bg-overlay" />
                  <div className="hover-box">
                    {/* <h2><a href="category.html">{catinfo.name}</a></h2>	 */}
                    <Link to={"/categories?cat_id=1495"} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                            {/* <h2>Eco Friendly Products</h2>	 */}
                            <h2>Bath & Skin Care</h2>
                            </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-3 col-xs-3 scat">
                <div className="category-box">
                  <div className="product-cat-img">
                  <img src="/../images/kitchen.jpg" alt="Kitchen" />
                  {/* <img src="https://www.artoftimeindia.com/wp-content/uploads/2017/01/placeholder.jpg" alt="pic" /> */}
                  </div>
                  <div className="bg-overlay" />
                  <div className="hover-box">
                    {/* <h2><a href="category.html">{catinfo.name}</a></h2>	 */}
                    <Link to={"/categories?cat_id=1506"} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                            <h2>Kitchen</h2>	
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-3 col-xs-3 scat">
                <div className="category-box">
                  <div className="product-cat-img">
                  <img src="/../images/sationary.jpg" alt="Kitchen" />
                  {/* <img src="https://www.artoftimeindia.com/wp-content/uploads/2017/01/placeholder.jpg" alt="pic" /> */}
                  </div>
                  <div className="bg-overlay" />
                  <div className="hover-box">
                    {/* <h2><a href="category.html">{catinfo.name}</a></h2>	 */}
                    <Link to={"/categories?cat_id=1506"} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                            <h2>Sationary</h2>	
                    </Link>
                  </div>
                </div>
              </div>




              <div className="coming-soon1 text-center addmore">
              <h3> We are continuously adding more plastic free products</h3>
              {/* <h3>Adding more items... </h3>
              <h3>Will be back soon.</h3> */}
              </div>
              </div> 
            </div>
          
          </div>
        </div>
      </section>

    );
  }
}
export default CatModel;