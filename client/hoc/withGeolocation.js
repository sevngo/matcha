import React, { useEffect } from 'react';
import { isNil } from 'ramda';

const withGeolocation = fieldName => Component => {
  const EnhancedComponent = props => {
    const { setFieldValue, values, withGeolocation } = props;
    useEffect(() => {
      if (values[fieldName] && withGeolocation) {
        navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
          /*global google*/
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            ([{ formatted_address }]) => {
              const address = {
                name: formatted_address,
                type: 'Point',
                coordinates: [longitude, latitude],
              };
              setFieldValue(fieldName, address);
            },
          );
        });
      }
    }, [isNil(values[fieldName])]);
    return <Component {...props} />;
  };
  return EnhancedComponent;
};

export default withGeolocation;
