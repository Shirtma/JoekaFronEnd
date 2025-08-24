import React from 'react';
import GoogleMapReact from 'google-map-react';
import { FaMapMarker } from 'react-icons/fa';
import styled from 'styled-components';

function LocationPin({ text }) {
  return (
    <div className="pin">
      <FaMapMarker className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );
}

function GoogleMap({ location, zoomLevel }) {
  return (
    <GoogleContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </GoogleContainer>
  );
}

const GoogleContainer = styled.div`
width: 35rem;
height: 46.5rem;
`;

export default GoogleMap;
