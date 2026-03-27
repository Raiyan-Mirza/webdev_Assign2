const btn = document.getElementById("btn");

btn.addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("text").value;

  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=864b744e9626ea3e53036cc91588fd1e&units=metric"
  );

  const data = await response.json();
  console.log(data);

  document.getElementById("city").textContent = "City: " + data.name;
  document.getElementById("temp").textContent = "Temp: " + data.main.temp + "°C";
  document.getElementById("weather").textContent = "Weather: " + data.weather[0].main;
  document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
  document.getElementById("windspeed").textContent = "Wind: " + data.wind.speed + " m/s";
}


