
import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';

import ClinicMarkOnMap from '../components/ClinicMarkOnMap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions';

class AllClinicsOnMap extends Component {

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [-31.8586510,115.8766300],
    zoom: 10,
    greatPlaceCoords: {lat: -31.8586510, lng: 115.8766300}
  };

  constructor(props) {
    super(props);
  }

  _onChildMouseEnter(e,childProps){
    this.props.mouseEnterClinic(e,this.props.clinics[e-1]);
  }

  _onChildMouseLeave(e,childProps){
    this.props.mouseLeaveClinic(e,this.props.clinics[e-1]);
  }

  _onChildClick(e,childProps){
    console.log(' _onChildClick =',e,childProps)
  }

  render() {

    //.filter((m, index) => index >= rowFrom && index <= rowTo)
    const Markers = this.props.clinics &&
        this.props.clinics.map((marker, index) => {
          return(
              <ClinicMarkOnMap
                // required props
                key={marker.clinicId}
                lat={marker.latitude}
                lng={marker.longitude}
                text={marker.clinicName}
                isEnter = {marker.isMouseEnter}
                />
            );
        });

    return (
        <div style={{width: '100%', height: '100%'}} className = "all-clinics-on-map">
          <GoogleMap
            // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
            center={this.props.center}
            zoom={this.props.zoom}
            onChildClick={this._onChildClick}
            onChildMouseEnter={this._onChildMouseEnter.bind(this)}
            onChildMouseLeave={this._onChildMouseLeave.bind(this)}
            >
              {Markers}
          </GoogleMap>
        </div>
    );
  }
}

function mapStateToProps(state){
  return {clinics: state.clinics};
}


export default connect(mapStateToProps,actions)(AllClinicsOnMap);
