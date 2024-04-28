import React, { useState } from 'react';

const GoToLocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleGoToLocation = () => {
    // Foydalanuvchi kiritgan joylashuvi bilan ishlaymiz
    const url = `https://yandex.com/maps/?ll=${longitude},${latitude}&z=15`;
    window.open(url);
  };

  return (
    <div>
      <h2>Go to Location</h2>
      <div>
        <label>
          Latitude:
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Longitude:
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
      </div>
      <button onClick={handleGoToLocation}>Go to Location</button>
    </div>
  );
};

export default GoToLocation;
