const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

const state = {
    city: "",
    latitude: null,
    longitude: null,
    weather: null,
    loading: false,
    error: null
};

// =========================================
// Fetch Coordinates
// =========================================

async function fetchCoordinates(city) {

    try {

        state.loading = true;
        state.error = null;

        const response = await fetch(
            `${GEO_API_URL}?name=${encodeURIComponent(city)}&count=1`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch coordinates.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("City not found.");
        }

        const location = data.results[0];

        state.city = location.name;
        state.latitude = location.latitude;
        state.longitude = location.longitude;

        console.log("Location Found");
        console.log(state);

        await fetchWeather(state.latitude, state.longitude);

    } catch (error) {

        state.error = error.message;
        console.error(error.message);

    } finally {

        state.loading = false;

    }

}

// =========================================
// Fetch Weather
// =========================================

async function fetchWeather(latitude, longitude) {

    try {

        state.loading = true;
        state.error = null;

        const response = await fetch(
            `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch weather.");
        }

        const data = await response.json();

        state.weather = data.current;

        console.log("Weather Found");
        console.log(state.weather);

    } catch (error) {

        state.error = error.message;
        console.error(error.message);

    } finally {

        state.loading = false;

    }

}

// =========================================
// Update UI
// =========================================

function updateUI() {
    const cityNameEl = document.getElementById("cityName");
    const temperatureEl = document.getElementById("temperature");
    const humidityEl = document.getElementById("humidity");
    const windSpeedEl = document.getElementById("windSpeed");

    if (state.error) {
        cityNameEl.textContent = "Error";
        temperatureEl.textContent = "--";
        humidityEl.textContent = "--";
        windSpeedEl.textContent = "--";
        alert(state.error);
        return;
    }

    if (state.weather) {
        cityNameEl.textContent = state.city;
        temperatureEl.textContent = state.weather.temperature_2m;
        humidityEl.textContent = state.weather.relative_humidity_2m;
        windSpeedEl.textContent = state.weather.wind_speed_10m;
    }
}

// =========================================
// Event Listeners
// =========================================

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", handleSearch);

const debouncedSearch = debounce(handleSearch, 500);

cityInput.addEventListener("input", debouncedSearch);

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});

function debounce(callback, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);

    };

}

async function handleSearch() {

    const city = cityInput.value.trim();

    if (!city) {
        return;
    }

    await fetchCoordinates(city);
    updateUI();

}