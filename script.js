const apiKey = "f5688f2926d19add2d9aea6fa12557a7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

async function searchCity() {
    const cityName = document.querySelector('input').value;
    
    const weatherInformationUrl = apiUrl + "&q=" + cityName + "&appid=" + apiKey;
    
    try {
        const weatherInformation = await fetch(weatherInformationUrl);
        const data = await weatherInformation.json();

        document.getElementById("temp").textContent         = `${Math.round(data.main.temp)}°C`;
        document.getElementById("feels").textContent        = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById("temp-min").textContent     = `${Math.round(data.main.temp_min)}°C`;
        document.getElementById("temp-max").textContent     = `${Math.round(data.main.temp_max)}°C`;
        document.getElementById("humidity").textContent     = `${data.main.humidity}%`;
        document.getElementById("pressure").textContent     = `${data.main.pressure} hPa`;
        document.getElementById("visibility").textContent   = `${(data.visibility/1000).toFixed(1)}km`;
        document.getElementById("clouds").textContent       = `${data.clouds.all}%`;
        document.getElementById("wind-speed").textContent   = `${(data.wind.speed*3.6).toFixed(1)} km/h`;
        document.getElementById("gust-speed").textContent   = `${(data.wind.gust*3.6).toFixed(1)} km/h`;
        document.getElementById("wind-dir").textContent     = `${data.wind.deg}°`;

        
        const toTime = ts =>
        new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        document.getElementById("sunrise").textContent = toTime(data.sys.sunrise);
        document.getElementById("sunset").textContent  = toTime(data.sys.sunset);
        
        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch(err) {
        console.error("Something went wrong:", err);
        alert("Failed to fetch weather data. Try again!");
    }

}