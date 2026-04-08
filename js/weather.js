async function getWeather() {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=36.75&longitude=-95.98&current_weather=true");
    const data = await res.json();

    document.getElementById("weather").innerHTML = `
        <h3>Temperature: ${data.current_weather.temperature}°C</h3>
    `;
}