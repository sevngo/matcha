import { useEffect } from 'react';
import { isNil } from 'ramda';
import axios from 'axios';

const useGeolocation = (fieldName, onChange, values, isGeoActivated) => {
  useEffect(() => {
    if (values[fieldName] && isGeoActivated) {
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
            `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLEMAPS_API_KEY}`,
          );
          if (lat && lng) setField(lng, lat);
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
          onChange(address);
        });
      };
    }
  }, [isNil(values[fieldName])]);
};

export default useGeolocation;
