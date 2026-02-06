/* TO DO: on the page https://open-meteo.com/en/docs/dmi-api, choose the data that I want to show in my weather app;
then, get TS code that I need to implement on each page (2 different selections).

Since the following is special to Denmark, it would be fun to include fog/low cloud cover.
"API Documentation (...)
Cloud Cover (2m): DMI provides cloud cover at 2 metre abouve ground which can be interpreted as fog. This is remarkable, because only very weather models are capable of modeling low level cloud cover and fog with a good degree of accuracy."
https://open-meteo.com/en/docs/dmi-api

GPS coordinates of TechCollege:
"Centre Point (lat,lon)	57.04768,9.967618"
Source: https://nominatim.openstreetmap.org/ui/details.html?osmtype=N&osmid=343076498&class=place

NOTE/TO DO: make a choice: unless I use states in a parent component (not refs because this data is rendered),
I need 2 fetch() functions (one for each page) because page components will unmount when the user goes to another page.
Advantage of putting states in a parent component:
- Open-Meteo limits how many calls can be made to their API per day, so this strategy would limit the number of calls per user.
Based on my selections for current weather, I got the following message:
"Note: This API call is equivalent to 1.4 calls because of factors like long time intervals, the number of locations, variables, or models involved."
Endpoint: 
https://api.open-meteo.com/v1/forecast?latitude=57.04768&longitude=9.967618&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,snowfall,rain,visibility,wind_speed_10m,wind_direction_10m,weather_code,is_day,sunshine_duration,cloud_cover,cloud_cover_2m&timezone=Europe%2FBerlin&forecast_days=1&models=dmi_seamless
Based on my selection for 3 days, I got the following message:
"Note: This API call is equivalent to 1.2 calls because of factors like long time intervals, the number of locations, variables, or models involved."
Endpoint:
https://api.open-meteo.com/v1/forecast?latitude=57.04768&longitude=9.967618&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset,daylight_duration,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours&timezone=Europe%2FBerlin&forecast_days=3&models=dmi_seamless

Disadvantage of putting states in a parent component:
- Weather data is updated every three hours, so it could happen that the data stored in a state no longer matches the 
data supplied by Open-Meteo.  
Details desired for the current-weather page:
- Latitude: 57.04768 or 57,04768 
- Longitude: 9.967618 or 9,967618
- Timezone: GMT+1 (Berlin)
- Forecast length: 1 day (current weather only)
- Time interval: that is for a range of dates, so no!
- Hourly Weather Variables: I need a detailed overview of current weather, so many of those
-- Apparent Temperature (this takes wind chill and rel. hum. into account)
-- Temperature (2 m)
-- Relative Humidity (2 m)
-- Precipitation (rain + snow)
-- Rain
-- Snowfall
-- Visibility
-- Wind Speed (10 m)
-- Wind Direction (10 m)
-- Is Day or Night
-- Sunshine Duration
-- Surface Temperature (close to the ground)? NO
-- Weather code
-- Cloud Cover Total (see charts.ecmwf.int/products/...)
-- Cloud Cover / Fog (2m)
-- Cloud Cover Low (low-level cloud cover, LCC)? NO (clouds at a certain height)
-- Cloud Cover Mid (medium-level cloud cover, MCC)? NO (clouds at a certain height)
-- Cloud Cover High (high-level cloud cover, HCC)? NO (clouds at a certain height)
- Daily Weather Variables: uncheck all

Details desired for the three-day forecast (short overview, no need to include all details, I might be keeping too much): 
- Latitude: 57.04768 
- Longitude: 9.967618
- Timezone: GMT+1 (Berlin)
- Forecast length: 3 days
- Time interval: that is for a range of dates, so no!
- Hourly Weather Variables: uncheck all
- Daily Weather Variables (a number of those values could be displayed on the same line on a relatively small card, I think): 
-- Weather code
-- Minimum Temperature (2 m) -> Maximum Temperature (2 m)
-- Maximum Wind Speed (10 m), Dominant Wind Direction (10 m) 
-- Sunrise -> Sunset = Daylight Duration
-- Precipitation Sum = Rain Sum + Snowfall Sum
-- Precipitation Hours

*/

/* Open-Meteo provides ready-made code to use the API's output based on settings chosen on the site.
Whenever I made changes to that code, I put my name in the code. */
import { fetchWeatherApi } from "openmeteo";

const params = {
    latitude: 57.04768,
    longitude: 9.967618,
    hourly: ["temperature_2m", "apparent_temperature", "relative_humidity_2m", "precipitation", "snowfall", "rain", "visibility", "wind_speed_10m", "wind_direction_10m", "weather_code", "is_day", "sunshine_duration", "cloud_cover", "cloud_cover_2m"],
    timezone: "Europe/Berlin",
    forecast_days: 1,
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

const hourly = response.hourly()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
    hourly: {
        time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
            (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
        ),
        temperature_2m: hourly.variables(0)!.valuesArray(),
        apparent_temperature: hourly.variables(1)!.valuesArray(),
        relative_humidity_2m: hourly.variables(2)!.valuesArray(),
        precipitation: hourly.variables(3)!.valuesArray(),
        snowfall: hourly.variables(4)!.valuesArray(),
        rain: hourly.variables(5)!.valuesArray(),
        visibility: hourly.variables(6)!.valuesArray(),
        wind_speed_10m: hourly.variables(7)!.valuesArray(),
        wind_direction_10m: hourly.variables(8)!.valuesArray(),
        weather_code: hourly.variables(9)!.valuesArray(),
        is_day: hourly.variables(10)!.valuesArray(),
        sunshine_duration: hourly.variables(11)!.valuesArray(),
        cloud_cover: hourly.variables(12)!.valuesArray(),
        cloud_cover_2m: hourly.variables(13)!.valuesArray(),
    },
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nHourly data:\n", weatherData.hourly);
