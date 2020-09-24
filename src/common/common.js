import React from 'react';
import moment from 'moment';
/**
 All common function, constants etc
 **/
export function decodeJwt(token) {
	var base64Url = token.split('.')[1];
	if(base64Url){
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}
	
};

export function isJwtExpired(token){
	if(token){
		const currentTimeStamp          =   new Date().getTime();
		const tokenExpirationtimestamp  =   token.exp * 1000;
		return moment(tokenExpirationtimestamp).isBefore(currentTimeStamp);	
	}else{
		return true;
	}
}

export function metadata(name, content){
    let meta = document.createElement('meta');
    meta.name= name;
    meta.setAttribute('content',content);
    document.getElementsByTagName('head')[0].appendChild(meta);
	
}


export function ucfirst(string){
	if(string){
		return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}else{
		return string;
	}
	
}


export function chunkArray(myArray, chunk_size){
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];    
    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }
    return tempArray;
}

export function objectToQueryString(object){
	if(!object) return null; 
	const queryString  =   Object.keys(object)
	.filter((key) => !!object[key])
	.map( k => `${encodeURIComponent(k)}=${encodeURIComponent(object[k])}`).join('&');
	return queryString;
}

export function timeCalculatorUsingSeconds(seconds){
	seconds = parseInt(seconds, 10);
   let days = Math.floor(seconds / (3600*24));
   seconds  -= days*3600*24;
   let hrs   = Math.floor(seconds / 3600);
   seconds  -= hrs*3600;
   let mnts = Math.floor(seconds / 60);
   seconds  -= mnts*60;
   if (days === 0) {
	   return (hrs + ":" + mnts + ":" + seconds)
   }
   if (days > 0) {
	   return ( days +"day's: " + hrs + " : " + mnts + " : " + seconds)
   }

 }


export function generateUniqueString(){
	const randomId = Math.random().toString(36).substr(2, 10);
	const uniqueId = moment().unix()+'-'+randomId;
	return uniqueId;
}



export function MinutesTohours(minutes) {
	const num = minutes;
	const hours = (num / 60);
	const rhours = Math.floor(hours);
	minutes = (hours - rhours) * 60;
	const rminutes = Math.round(minutes);
	//return rhours + " hour(s) and " + rminutes + " minute(s).";
	return rhours+':'+rminutes;
}


export function formatDate(d) {
	return moment(d).format('LLL')
	/*var date = new Date(d);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var locale = "en-us",
	month = date.toLocaleString(locale, { month: "short" });
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	var dateFormat =  date.getDate() + "-"+ month + "-" + date.getYear().toString().substring(1);
	return (
		<div>
		  <span> {dateFormat} </span> <br/><span>{strTime}</span>
		</div>
	);*/
  }
  function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

export function generateUniqueDeviceId(){
	return Math.random().toString(36).substring(9, 15) + Math.random().toString(36).substring(6, 15)
}

export function ConverPrice(price) {
	// const convertedprice = price/100;
	// return convertedprice;
	return <strong>{price}</strong>;
}


export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return Math.round(d * 100) / 100
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


export function servicesChildern(serviceObj) {
	let services = [];
    let rank = 1;
    serviceObj.map((item, index) => {
        if(item.children) {
            services.push({ 'text': item.service_name, 'value':item.id, 'rank':rank})
			item.children.map((item, index) => {
				services.push({ 'text': item.service_name, 'value':item.id ,'rank':rank + 1})
				item.children.map((item, index) => {
					services.push({ 'text': item.service_name, 'value':item.id ,'rank':rank + 2})
					return true;
				});
				return true;
			})
        } else {
            services.push({ 'text': item.service_name, 'value':item.id, 'rank':rank})
		}
		return true;
    });
    return services;	
};


export function delcurrencySymbol(price) {
	return (<span className="p-r-10"><del><strong>£ </strong> {price} </del> </span>);
}

export function currencySymbol(price) {
	return (<span><strong>£ </strong> {price}</span>);
}



export function makeArrayForBrandsAndCate(brands) {
	let brandArray = {}; 
	brands.map( (item) => {
			return(
				// brandArray.push({[brand.id]: brand.brand_name})
				Object.assign(brandArray, {[item.id]: item.name})
			)    
	})
	return brandArray;
}

export function makeArrayForCategories(categories) {
	let categoryArray = {}; 

	categories.map( (item, index) => {
		Object.assign(categoryArray, {[item.id]: item.name});
		return true;
	}) 
	return categoryArray;
}


export function getRelatedVarientsByAttributes(attrName, attrValue, varientsArray) {
	let relatedProduct = varientsArray.filter((varient)=>{
		if(varient.attributes){
			return (varient.attributes[attrName] ===  attrValue);
		}else{
			return false;
		}
		
	})
	return (relatedProduct[0]) ? relatedProduct[0] : [];
}


export function formatOrderUUID(uuid){
	// return uuid.split("-").pop().toUpperCase();
	return uuid;
}
