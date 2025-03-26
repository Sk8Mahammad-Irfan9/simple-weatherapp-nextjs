"use client";
import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&q=${city}&aqi=no`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError("An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-900 text-white">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-red-500">Weather App</h1>
      </div>

      <input
        type="text"
        className="w-full p-2 bg-gray-800 border border-red-300 rounded-lg mb-4 text-red-500"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="w-full p-2 bg-red-500 text-white rounded-lg mb-4"
      >
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {weatherData && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-500">
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p className="text-xl">
            {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
          </p>
          <p>{weatherData.current.condition.text}</p>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            className="my-2"
          />
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>
            Wind: {weatherData.current.wind_kph} km/h (
            {weatherData.current.wind_dir})
          </p>
          <p>
            Feels Like: {weatherData.current.feelslike_c}°C /{" "}
            {weatherData.current.feelslike_f}°F
          </p>
          <p>Pressure: {weatherData.current.pressure_mb} hPa</p>
          <p>Visibility: {weatherData.current.vis_km} km</p>
        </div>
      )}
    </div>
  );
}
