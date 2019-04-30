import React, { useEffect } from 'react';
import { isNil } from 'ramda';
import axios from 'axios';

const withGeolocation = fieldName => Component => {
  const EnhancedComponent = props => {
    const { setFieldValue, values, withGeolocation } = props;
    useEffect(() => {
      if (values[fieldName] && withGeolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { longitude: lng, latitude: lat } }) => {
            setField(lng, lat);
          },
          async () => {
            const {
              data: {
                location: { lat, lng },
              },
            } = await axios.post(
              `https://www.googleapis.com/geolocation/v1/geolocate?key=${
                process.env.GOOGLEMAPS_API_KEY
              }`,
            );
            setField(lng, lat);
          },
        );
        const setField = (lng, lat) => {
          /*global google*/
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, ([{ formatted_address }]) => {
            const address = {
              name: formatted_address,
              type: 'Point',
              coordinates: [lng, lat],
            };
            setFieldValue(fieldName, address);
          });
        };
      }
    }, [isNil(values[fieldName])]);
    return <Component {...props} />;
  };
  return EnhancedComponent;
};

export default withGeolocation;
