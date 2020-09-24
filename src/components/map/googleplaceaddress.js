import React from 'react'
const google = window.google;
class ParlorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState()
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.autocomplete = null
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }

  initialState() {
    return {
      postcode: '',
      street_address: '',
      city_town: '',
      state: '',
      postcode: '',
      county: '',
      country:'',
      googleMapLink: ''
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
     this.props.addNewAddress(this.state)
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace()
    let address = addressObject.address_components
    this.setState({
      // name: addressObject.name,
      postcode: `${address[0].long_name}`,
      street_address: `${address[1].long_name}`,
      city_town: address[2] ? address[2].long_name : '',
      county: address[3] ? address[3].short_name : '',
      state: address[4] ? address[4].short_name : '',
      country: address[5] ? address[5].long_name : '',

      googleaddresss:{
        postcode: `${address[0].long_name}`,
        street_address: `${address[1].long_name}`,
        city_town: address[2] ? address[2].long_name : '',
        county: address[3] ? address[3].short_name : '',
        state: address[4] ? address[4].short_name : '',
        country: address[5] ? address[5].long_name : '',
      }
      
      // googleMapLink: addressObject.url
    })

    this.props.addNewAddress(this.state.googleaddresss)
    return false;
  }

  render() {
    return (
      <div>
        {/* <h1>Add New Address</h1> */}
        <div className="bg0 p-t-30 p-b-10 p-lr-25 p-lr-15-lg how-pos3-parent">
          <div className="row">
            <div className="col-md-12 add-address-border">
              <div className="row">
                <div className="col-md-12 address-box">
                  <div className="add-box pull-left">
                    <h4 className="m-b-20">Add Address</h4>
                  </div>
                </div>
              </div>
              <form method="post" className=" signup-form-inner" onSubmit={this.handleSubmit}>
              
                <fieldset>
                <div className="form-group">
                    <input id="autocomplete"
                      className="form-control"
                      ref="input"
                      placeholder={"Postcode enter"}
                      type="text" />
                  </div>
                  <div className="form-group">
                    <input type="text" id="address1" className="form-control" name="floor_number" placeholder="Floor Number" onChange={this.handleChange} value={this.props.floor_number} />
                  </div>
                  <div className="form-group">
                    <input type="text" id="address2" className=" form-control" name="door_number" placeholder="Door Number" required onChange={this.handleChange} value={this.props.door_number} />

                  </div>
                 
                  <div className="form-group">
                    <input type="text" id="state" className="form-control" name="landmark" placeholder="Landmark" onChange={this.handleChange} value={this.props.landmark} />
                  </div>
                  <div className="form-group">
                    <input
                      className=" form-control"
                      name={"street_address"}
                      value={this.state.street_address}
                      placeholder={"Street address"}
                      onChange={this.handleChange}
                    />
                  </div>
                  {/* <div className="form-group">
                    <input
                      className=" form-control"
                      name={"name"}
                      value={this.state.name}
                      placeholder={"Address"}
                      onChange={this.handleChange}
                    />
                  </div> */}
                  <div className="form-group">
                    <input
                      className=" form-control"
                      name={"city_town"}
                      value={this.state.city_town}
                      placeholder={"City/Town"}
                      onChange={this.handleChange}
                    />
                  </div>
                  
                 
                  <div className="form-group">
                    <input
                      className=" form-control"
                      name={"county"}
                      value={this.state.county}
                      placeholder={"County"}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input type="text" id="city" className=" form-control" name="postcode" title="Please enter correct post code" placeholder="Post Code" required onChange={this.handleChange} value={this.state.postcode} />
                  </div>
                  <div className="form-group">
                    <input
                      className=" form-control"
                      name={"state"}
                      value={this.state.state}
                      placeholder={"State"}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className=" form-control"
                      name={"country"}
                      value={this.state.country}
                      placeholder={"Country"}
                      onChange={this.handleChange}
                    />
                  </div>
                  {/* <div className="form-group">
                    <input
                      className=" form-control"
                      name={"zip_code"}
                      value={this.state.zip_code}
                      placeholder={"Zipcode"}
                      onChange={this.handleChange}
                    />
                  </div> */}
                  <button id="submit" className="btn btn-default default-btn" name="submit" type="submit" >Save Address</button>

                </fieldset>
              </form>
            </div>
          </div>
        </div>
        {/* <form className=" signup-form-inner" onSubmit={this.handleSubmit}>
        
            
            <button className="btn btn-default default-btn" name="submit" onSubmit={this.handleSubmit}>Submit</button> */}
        {/* </form> */}
      </div >
    )
  }

}

export default ParlorForm