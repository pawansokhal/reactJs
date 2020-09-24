import React from "react"
import { GOOGLE_MAP_KEY } from '././../../config//config';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+GOOGLE_MAP_KEY+"&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        places: [],
        show:true, 
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          console.log('places', places)
          this.setState({
            places,
            show:false
          });
          this.props.handleAddress(places)
        },
        handleKeyPress: (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
      autoComplete="address-line1"
    >
      <input
        autoComplete="address-line1"
        onKeyPress={props.handleKeyPress.bind(this)}
        type="text"
        placeholder="Search Your address"
        className="form-control"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </StandaloneSearchBox>
    <br/>
      {props.places.map(({ address, place_id, formatted_address, geometry: { location } }) =>
        <textarea  autoComplete="address-line2" style={{overflow: 'hidden'}} rows="4" type="text" key={place_id} title="Address" required className="form-control" placeholder="Address" name="address" onChange={props.handleInputChange} defaultValue={formatted_address} />
    //     <li key={place_id}>
    //     {formatted_address}
    //     {" at "}
    //     ({location.lat()}, {location.lng()})
    //   </li>
      )}
      {props.address && props.show? 
      <textarea   autoComplete="address-line2" style={{overflow: 'hidden'}} rows="4" type="text"  title="Address" required className="form-control" placeholder="Address" name="address" onChange={props.handleInputChange} defaultValue={props.address} />
      : null}
    
  </div>
);
class AddressMap extends React.PureComponent {
  render() {
      return (
        <PlacesWithStandaloneSearchBox handleAddress={this.props.handleAddress} handleInputChange={this.props.handleInputChange}/>            
      ) 
  }
}
export default (AddressMap);