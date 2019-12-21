/*global google*/
import { useEffect } from 'react';
import axios from 'axios';
import { path } from 'ramda';

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
      autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.setTypes(['address']);
      autocomplete.setFields(['formatted_address', 'geometry']);
      autocomplete.addListener('place_changed', handlePlace);
    }
  }, [isActive]);
};

export const useGeolocation = (onChange, isActive) => {
  useEffect(() => {
    if (isActive) {
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
            `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`,
          );
          if (lat && lng) setField(lng, lat);
        },
      );
      const setField = (lng, lat) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, ([{ formatted_address }]) => {
          const address = {
            name: formatted_address,
            type: 'Point',
            coordinates: [lng, lat],
          };
          onChange(address);
        });
      };
    }
  }, [isActive, onChange]);
};
