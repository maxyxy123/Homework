import React, { useEffect, useState } from 'react';

function WeatherWidget() {
  const [weather, setWeather] = useState('Loading...');

  useEffect(() => {
    fetch('https://example.com/weather')
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.weather);
      });
  }, []);

  return <p>{weather}</p>;
}

export default WeatherWidget;