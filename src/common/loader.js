import React, { Component } from 'react';
// import loaderImg from '../images/bottle.png';
// import loaderImg from '../images/whales.gif';
import loaderImg from '../images/wh.gif';

class Loader extends Component {
   constructor(props){
        super(props);
        this.name =  this.props.name
    }
  render() {
    return (
        <div id='loader'>
          <img className="botal" src ={loaderImg}  alt="loader"/>
        </div>
        // <div id='loader'>
        // {localStorage.getItem('catlogid') === "1" ? <img className="botal" src ={loaderImg}  alt="loader"/>
        // :<font className="textfocompany text-center"> Taking you to <br/> <h1>{this.name}  </h1></font>}
        // </div>
    );
  }
}



export default Loader;