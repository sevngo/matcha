import { useEffect } from 'react';
import { isNil, path } from 'ramda';

const useAutocomplete = (fieldName, onChange, values) => {
  let autocomplete;
  const handlePlace = () => {
    const newAddress = autocomplete.getPlace();
    const { formatted_address } = newAddress;
    const location = path(['geometry', 'location'])(newAddress);
    if (!location) return;
    const address = {
      name: formatted_address,
      type: 'Point',
      coordinates: [location.lng(), location.lat()],
    };
    onChange(address);
  };
  useEffect(() => {
    if (values[fieldName]) {
      /*global google*/
      autocomplete = new google.maps.places.Autocomplete(document.getElementById(fieldName));
      autocomplete.setTypes(['address']);
      autocomplete.setFields(['formatted_address', 'geometry']);
      autocomplete.addListener('place_changed', handlePlace);
    }
  }, [isNil(values[fieldName])]);
};

export default useAutocomplete;
