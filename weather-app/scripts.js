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
let url = "https://tordevries.github.io/477/examples/ajax-api-test/current.js";

getData(url).then(function(result) {
    console.log(result);
    updateCurrentWeather(result);
});

function updateCurrentWeather(result) {
    document.querySelector("#location").textContent = result.location.name + ", " + result.location.region;
    document.querySelector("#tempNow").textContent = result.current.temp_c + "°C";
    document.querySelector("#conditionTextNow").textContent = result.current.condition.text;
    document.querySelector("#windNow").textContent = result.current.wind_kph + " km/h";
    document.querySelector("#humidityNow").textContent = result.current.humidity + "%";
    document.querySelector("#iconNow").src = "https:" + result.current.condition.icon;
}