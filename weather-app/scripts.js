async function getData(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw(response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

// get user's IP address
let ipUrl = "https://api.ipify.org/?format=json";

// RapidAPI options for weather API
let options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "abdc52e4f2msh71011d8b7815547p17a639jsn607c00941e6a",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
    }
};

// get IP address and then get weather data
getData(ipUrl).then(function(result) {
    console.log(result);
    getWeatherByIP(result.ip);
});

// get live weather using IP
function getWeatherByIP(userIP) {
    let weatherUrl = "https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + userIP + "&days=3";

    getData(weatherUrl, options).then(function(result) {
        console.log(result);
        updateCurrentWeather(result);
        updateForecast(result);
    });
}

// update current weather section
function updateCurrentWeather(result) {
    document.querySelector("#location").textContent = result.location.name + ", " + result.location.region;
    document.querySelector("#tempNow").textContent = result.current.temp_c + "°C";
    document.querySelector("#conditionTextNow").textContent = result.current.condition.text;
    document.querySelector("#windNow").textContent = result.current.wind_kph + " km/h";
    document.querySelector("#humidityNow").textContent = result.current.humidity + "%";
    document.querySelector("#iconNow").src = "https:" + result.current.condition.icon;
}

// update forecast
function updateForecast(result) {
    let forecastDays = result.forecast.forecastday;

    document.querySelector("#day1Name").textContent = forecastDays[0].date;
    document.querySelector("#day1Icon").src = "https:" + forecastDays[0].day.condition.icon;
    document.querySelector("#day1Cond").textContent = forecastDays[0].day.condition.text;
    document.querySelector("#day1Temp").textContent = forecastDays[0].day.maxtemp_c + "°C / " + forecastDays[0].day.mintemp_c + "°C";
    document.querySelector("#day1Wind").textContent = forecastDays[0].day.maxwind_kph + " km/h";

    document.querySelector("#day2Name").textContent = forecastDays[1].date;
    document.querySelector("#day2Icon").src = "https:" + forecastDays[1].day.condition.icon;
    document.querySelector("#day2Cond").textContent = forecastDays[1].day.condition.text;
    document.querySelector("#day2Temp").textContent = forecastDays[1].day.maxtemp_c + "°C / " + forecastDays[1].day.mintemp_c + "°C";
    document.querySelector("#day2Wind").textContent = forecastDays[1].day.maxwind_kph + " km/h";

    document.querySelector("#day3Name").textContent = forecastDays[2].date;
    document.querySelector("#day3Icon").src = "https:" + forecastDays[2].day.condition.icon;
    document.querySelector("#day3Cond").textContent = forecastDays[2].day.condition.text;
    document.querySelector("#day3Temp").textContent = forecastDays[2].day.maxtemp_c + "°C / " + forecastDays[2].day.mintemp_c + "°C";
    document.querySelector("#day3Wind").textContent = forecastDays[2].day.maxwind_kph + " km/h";
}

// modal elements
let openModalButton = document.querySelector("#openModal");
let modalBackground = document.querySelector("#modalBackground");
let locationModal = document.querySelector("#locationModal");
let locationForm = document.querySelector("#locationForm");

// open modal
openModalButton.addEventListener("click", function() {
    modalBackground.style.display = "block";
    locationModal.style.display = "block";
});

// close modal
locationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    modalBackground.style.display = "none";
    locationModal.style.display = "none";
});