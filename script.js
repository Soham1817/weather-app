// API key for OpenWeatherMap
const apiKey = "f5688f2926d19add2d9aea6fa12557a7";
// Base URL for fetching weather data in metric units (Celsius)
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

// Main function to search weather for the entered city
async function searchCity() {
    // Get the city name from the input field
    const cityName = document.querySelector('input').value;
    
    // Construct the full API URL using the city name and API key
    const weatherInformationUrl = apiUrl + "&q=" + cityName + "&appid=" + apiKey;
    
    try {
        // Fetch weather data from the API
        const weatherInformation = await fetch(weatherInformationUrl);
        const data = await weatherInformation.json();

        // Update the weather conditions
        document.getElementById("temp").textContent         = `${Math.round(data.main.temp)}°C`;
        document.getElementById("feels").textContent        = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById("temp-min").textContent     = `${Math.round(data.main.temp_min)}°C`;
        document.getElementById("temp-max").textContent     = `${Math.round(data.main.temp_max)}°C`;
        document.getElementById("humidity").textContent     = `${data.main.humidity}%`;
        document.getElementById("pressure").textContent     = `${data.main.pressure} hPa`;
        document.getElementById("visibility").textContent   = `${(data.visibility/1000).toFixed(1)}km`;
        document.getElementById("clouds").textContent       = `${data.clouds.all}%`;
        // Convert wind speed and gust from m/s to km/h
        document.getElementById("wind-speed").textContent   = `${(data.wind.speed*3.6).toFixed(1)} km/h`;
        document.getElementById("gust-speed").textContent   = `${(data.wind.gust*3.6).toFixed(1)} km/h`;

        document.getElementById("wind-dir").textContent     = `${data.wind.deg}°`;

        // Convert UNIX timestamps for sunrise/sunset to readable time
        const toTime = ts =>
        new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        document.getElementById("sunrise").textContent = toTime(data.sys.sunrise);
        document.getElementById("sunset").textContent  = toTime(data.sys.sunset);
        
        // Set weather icon based on the icon code returned by the API
        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch(err) {
        console.error("Something went wrong:", err);
        alert("Failed to fetch weather data. Try again!");
    }

}