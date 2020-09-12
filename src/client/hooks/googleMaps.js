/*global google*/
import { useEffect } from 'react';
import { path } from 'ramda';
import { useDispatch } from 'react-redux';
import { displayLoader, hideLoader } from '../actions/loading';

export const useAutocomplete = (inputId, onChange, isActive) => {
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
    if (isActive) {
      const element = document.getElementById(inputId);
      autocomplete = new google.maps.places.Autocomplete(element); // eslint-disable-line react-hooks/exhaustive-deps
      autocomplete.setTypes(['address']);
      autocomplete.setFields(['formatted_address', 'geometry']);
      autocomplete.addListener('place_changed', handlePlace);
    }
  }, [isActive]);
};

export const useGeolocation = (onChange, isActive) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isActive) {
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
    }
  }, [isActive, onChange, dispatch]);
};
