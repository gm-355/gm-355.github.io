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

// test sample data in console
let url = "https://tordevries.github.io/477/examples/ajax-api-test/current-forecast.js";

getData(url).then(function(result) {
    console.log(result);
    updateCurrentWeather(result);
    updateForecast(result);
});

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