import axios from "axios";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherDetail, setWeatherDetail] = useState(null); // Changed to null for better conditional rendering

  const checkWeather = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=d347dfb1a00b4f86add45435242510&q=${city}`)
      .then(function (response) {
        console.log(response.data);
        setWeatherDetail(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div style="background-color: beige;">
      <form onSubmit={checkWeather}>
        <label htmlFor="Type City Name">
          Type City Name:
          <input
            type="text"
            id="Type City Name"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          />
        </label>
        <button>Submit</button>
      </form>

      {weatherDetail && (
        <div>
          <h2>Weather Details for {weatherDetail.location.name}</h2>
          <p>Temperature: {weatherDetail.current.temp_c} °C</p>
          <p>Condition: {weatherDetail.current.condition.text} <img src={`https:${weatherDetail?.current?.condition?.icon}`} alt="" /></p>
          <p>Humidity: {weatherDetail.current.humidity} %</p>
          <p>Wind Speed: {weatherDetail.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default App;
