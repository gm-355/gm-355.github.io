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
});