async function getWeather() {
  const city = document.getElementById('city').value;
  const apiKey = 'YOUR_API_KEY'; // Use OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.main) {
    document.getElementById('result').innerHTML = `
      <h2>${data.name}</h2>
      <p>Temp: ${data.main.temp} °C</p>
      <p>${data.weather[0].description}</p>
    `;
  } else {
    document.getElementById('result').textContent = 'City not found';
  }
}
