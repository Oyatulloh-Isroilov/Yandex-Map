import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-map';

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          try {
            const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=5eb6c422-dd2a-42cb-ba15-2bce72217da0&format=json&geocode=${longitude},${latitude}`);
            const data = await response.json();
            const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
            setUserAddress(address);
          } catch (error) {
            console.error('Error getting user address:', error);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleNavigate = () => {
    if (userLocation) {
      window.open(`https://yandex.com/maps/?ll=${userLocation.longitude},${userLocation.latitude}&z=15`);
    }
  };

  return (
    <div>
      <YMaps>
        <div>
          <h1>Yandex Map</h1>
          {userLocation ? (
            <Map
              defaultState={{ center: [userLocation.latitude, userLocation.longitude], zoom: 9 }}
              style={{ width: '100%', height: '400px' }}
            >
              <Placemark geometry={[userLocation.latitude, userLocation.longitude]} />
            </Map>
          ) : (
            <p>Loading map...</p>
          )}
          {userAddress && (
            <p>User is currently at: {userAddress}</p>
          )}
          {userLocation && (
            <button onClick={handleNavigate}>Navigate to User Location</button>
          )}
        </div>
      </YMaps>
    </div>
  );
};

export default MapComponent;
