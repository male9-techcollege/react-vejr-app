/* Open-Meteo provides ready-made code to use the API's output based on settings chosen on the site.
Whenever I make changes to that code, I put my name in the code. */

import { fetchWeatherApi } from "openmeteo";

const params = {
    latitude: 57.04768,
    longitude: 9.967618,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max", "wind_direction_10m_dominant", "sunrise", "sunset", "daylight_duration", "precipitation_sum", "rain_sum", "snowfall_sum", "precipitation_hours"],
    timezone: "Europe/Berlin",
    forecast_days: 3,
    models: "dmi_seamless",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(5)!;
const sunset = daily.variables(6)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
    daily: {
        time: Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
        ),
        weather_code: daily.variables(0)!.valuesArray(),
        temperature_2m_max: daily.variables(1)!.valuesArray(),
        temperature_2m_min: daily.variables(2)!.valuesArray(),
        wind_speed_10m_max: daily.variables(3)!.valuesArray(),
        wind_direction_10m_dominant: daily.variables(4)!.valuesArray(),
        // Map Int64 values to according structure
        sunrise: [...Array(sunrise.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        // Map Int64 values to according structure
        sunset: [...Array(sunset.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        daylight_duration: daily.variables(7)!.valuesArray(),
        precipitation_sum: daily.variables(8)!.valuesArray(),
        rain_sum: daily.variables(9)!.valuesArray(),
        snowfall_sum: daily.variables(10)!.valuesArray(),
        precipitation_hours: daily.variables(11)!.valuesArray(),
    },
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nDaily data:\n", weatherData.daily);
