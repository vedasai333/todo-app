import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const getWeather = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );
      setWeather(res.data);
    } catch (error) {
      alert("City not found");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Weather Search</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>
      
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;