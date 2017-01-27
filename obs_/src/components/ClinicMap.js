/*
 * Base Google Map example
 */
import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';
import ClinicMarkOnMap from './ClinicMarkOnMap';

export default class ClinicMap extends Component {

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

  render() {
    return (
       <GoogleMap
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}>

        <ClinicMarkOnMap lat={-31.9487910} lng={115.9298860} text={'A'} /* Kreyser Avrora */ />
        <ClinicMarkOnMap {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
      </GoogleMap>
    );
  }
}