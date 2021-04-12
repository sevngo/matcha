/*global google*/
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { displayLoader, hideLoader } from '../actions/loading';

export const useAutocomplete = (inputName, onChange, isActive) => {
  const autocomplete = useRef();
  useEffect(() => {
    if (isActive) {
      const handlePlace = () => {
        const newAddress = autocomplete.current.getPlace();
        const { formatted_address } = newAddress;
        const location = newAddress.geometry?.location;
        if (!location) return;
        const address = {
          name: formatted_address,
          type: 'Point',
          coordinates: [location.lng(), location.lat()],
        };
        onChange(address);
      };
      const [element] = document.getElementsByName(inputName);
      autocomplete.current = new google.maps.places.Autocomplete(element); // eslint-disable-line react-hooks/exhaustive-deps
      autocomplete.current.setTypes(['address']);
      autocomplete.current.setFields(['formatted_address', 'geometry']);
      autocomplete.current.addListener('place_changed', handlePlace);
    }
  }, [isActive, onChange, inputName]);
};

export const useGeolocation = (onChange) => {
  const dispatch = useDispatch();
  const getGeolocation = () => {
    dispatch(displayLoader());
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude: lng, latitude: lat } }) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat, lng } },
          ([{ formatted_address }], status) => {
            if (status === 'OK') {
              const address = {
                name: formatted_address,
                type: 'Point',
                coordinates: [lng, lat],
              };
              onChange(address);
            }
            dispatch(hideLoader());
          }
        );
      },
      () => dispatch(hideLoader())
    );
  };
  return getGeolocation;
};
