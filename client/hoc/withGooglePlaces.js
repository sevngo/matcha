import React, { useEffect } from 'react';
import { isNil } from 'ramda';

const withGooglePlaces = fieldName => Component => {
  const EnhancedComponent = props => {
    const { setFieldValue, values } = props;
    let autocomplete;
    const handlePlace = () => {
      const newAddress = autocomplete.getPlace();
      if (!newAddress.geometry) return setFieldValue(fieldName, { name: '' });
      const address = {
        name: newAddress.formatted_address,
        lat: newAddress.geometry.location.lat(),
        lng: newAddress.geometry.location.lng(),
      };
      setFieldValue(fieldName, address);
    };
    useEffect(() => {
      if (values[fieldName]) {
        /*global google*/
        autocomplete = new google.maps.places.Autocomplete(document.getElementById(fieldName));
        autocomplete.setTypes(['(cities)']);
        autocomplete.setFields(['formatted_address', 'geometry']);
        autocomplete.addListener('place_changed', handlePlace);
      }
    }, [isNil(values[fieldName])]);
    return <Component {...props} />;
  };
  return EnhancedComponent;
};

export default withGooglePlaces;
