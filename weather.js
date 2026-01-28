const inputText = document.getElementById("input-text");
const weatherBtn = document.getElementById("weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName =  document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description =  document.getElementById("description");
const errorMessage =  document.getElementById("error-message");

const API_KEY = "4a331c5de4b22af4dd650a75c65bfcd7";

weatherBtn.addEventListener("click", async ()=>{
    const city = inputText.value.trim();
    if(!city) return;

    try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
        
    } catch (error) {
        showError();
        
    }

});
async function fetchWeatherData(city){
    //get the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}` ;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("City not found");
    }

    const data =  response.json();
    return data;

}
function displayWeatherData(data){
    //display data
    const {name, main, weather , sys} =  data;

    cityName.textContent = name;
    temperature.textContent = `Temperature : ${main.temp}°C`;
    description.textContent =  `Weather : ${weather[0].description}`;

        // Set country flag
    const flagUrl = `https://flagcdn.com/48x36/${sys.country.toLowerCase()}.png`;
    document.getElementById("country-flag").src = flagUrl;

    // Set weather icon from OpenWeather
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;

     weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    inputText.value = "";
}

function showError(){
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
}