/* Source for the creation of pages:
- react-fetch-codealong-med-kasper
- react-router-codealong-med-kasper
- Min tidligere opgave react-gallery-wrapper
*/
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { placeholderCurrentWeather } from "../data/openmeteo-placeholders";

import gridstyling from "../components/shared/atoms/grid.module.scss";
import { SectionH1to2ByMariePierreLessard } from "../components/main-el/section-h1-2";
import { GridByMariePierreLessard } from "../components/shared/atoms/grid";
import { ImgComponentByMariePierreLessard } from "../components/shared/atoms/img-el"

import snow from "../assets/snowy-background-1609.jpg";
import rain from "../assets/vecteezy_rain-hand-drawn-spring-icons_6549685.jpg";
import sunshine from "../assets/summer-background-1303.jpg";

export const HomeByMariePierreLessard = () => {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx 
    Interestingly, I get an error until I specify that the type of useOutletContext is any.
    I tried with <string>, but it doesn't work, even though the only prop sent is typed as a string in global-layout.tsx. 
    I am guessing that the react-router people might prefer useOutletContext to always have the type any because it is
    a context that can pass a whole variety of props. The app is more future-proof that way... */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    const hourlyWeatherUrlByMariePierreLessard = "https://api.open-meteo.com/v1/forecast?latitude=57.04768&longitude=9.967618&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,snowfall,rain,visibility,wind_speed_10m,wind_direction_10m,weather_code,is_day,sunshine_duration,cloud_cover,cloud_cover_2m&timezone=Europe%2FBerlin&forecast_days=1&models=dmi_seamless";
    /* 1. During the codealong, I got an error (no item displayed) until I added <any> 
    2. Kasper advises to install an extension like
    Paste JSON as Code (Refresh)
    in order to get the types of incoming data */
    const [hourlyWeatherDataByMariePierreLessard, setHourlyWeatherDataByMariePierreLessard] = useState<any>(placeholderCurrentWeather);

    /* In order to know what is returned (its structure, etc.) and get the types (e.g. with Paste JSON as Code (Refresh)), 
    the following code can temporarily be used:
    useEffect(()=> {
        fetch(hourlyWeatherUrlByMariePierreLessard)
            .then((res)=> res.json())
            .then((data)=> console.log(data));
    }, []);

    Since this payload is rather detailed and scientific, I saved it in my folder types > file openmeteo-current-sample
    to have a local reference and avoid making 1000 calls to the API just to find property names.
    */

    useEffect(() => {
        fetch(hourlyWeatherUrlByMariePierreLessard)
            .then((res) => res.json())
            .then((data) => setHourlyWeatherDataByMariePierreLessard(data));
    }, []);

    /* Keep the following reminders:
    1. The setter has to be in useEffect, otherwise there is an infinite loop. It is because React re-renders every time 
    a state changes.

    useEffect(() => {
        setHourlyWeatherDataByMariePierreLessard(currentSample);
    }, []);

    2. The above doesn't work every time, actually! 
    Not unless the useState hook has default data to put in the state. In the absence of data
    in the state on mounting, errors are thrown because the template doesn't have the required data to show yet. useEffect
    takes too long to run, even if it's just milliseconds, as explained in the following source.

    Side note: fetch is asynchronous, though, so that source is a bit confusing in its choice of words.
    "The function passed to useEffect serves two main purposes:
    Effect Execution: This function runs after the render phase, allowing you to perform side effects. (...)
    React expects the function passed to useEffect to return either void or a cleanup function. An async function, however, 
    returns a Promise. This inconsistency can lead to errors in React’s lifecycle management. (...)
    To handle asynchronous operations within useEffect, you should define an async function inside the useEffect callback and then call it. This ensures the useEffect callback remains synchronous and adheres to the expected return type."
    https://medium.com/@almustarik/why-you-cant-use-async-functions-directly-in-useeffect-and-how-to-handle-asynchronous-side-effects-fbf529242e49
    
    I had encountered this problem when I finished react-joke-fetcher, actually, but I think that I blamed the server and
    its speed. The following troubleshooting notes show that this problem can occur even when the data to put in the state
    is readily available on the same machine (IF there is no default value in useState).

    Troubleshooting notes:
    When hourlyWeatherDataByMariePierreLessard
    stores the sample object that I got out of the API and put in a file, 
    the following view code only works as long as it is commented out until everything else 
    is mounted, i.e. it doesn't work if I access the page when the view code is in the component.

    <p>Kote over havets overflade: {hourlyWeatherDataByMariePierreLessard.elevation} m</p> 
    (Kote over havets overflade = Elevation in EN)

    The view code doesn't work at all when I try to display the data straight from the API.
    In the console.log, the message says that elevation is undefined.
    The following always happens when I make an API call:
    The console log of hourlyWeatherDataByMariePierreLessard first says that hourlyWeatherDataByMariePierreLessard
    is undefined, and then it shows me the object because there are 2 executions of the console log.

    I need to make sure that the code only attemps to display this after the data was saved in the state.

    Interestingly, in react-fetch-codealong-med-kasper, the fetch in useEffect is exactly the same,
    and there is no default value in useState,
    but there is a difference in the template: an array function has to run before the fetched data
    is displayed. Running that function must delay the display long enough to avoid the error that 
    I am encountering.  
    */

    /* Note: this is not going to show the weather for the right hour if the user is not in the same time zone,
    but I think that solving that issue would be beyong the learning goals of this exercise. 
    
    Also, I am not putting these in a separate file or in a parent because the date calculations rely on a different set
    of fetched data that also has a different date format on the current-weather page and the three-day-forecast page. */
    /* "The Date() constructor creates Date objects. When called as a function, it returns a string representing 
    the current time."
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date */
    const currentDateAndTimeByMariePierreLessard = new Date();
    // console.log("New date: ", currentDateAndTimeByMariePierreLessard);
    /* "The getHours() method of Date instances returns the hours for this date according to local time."
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours 
    It only returns the hour as an integer (no following minutes).
    */
    /* I used currentTimeOfDayByMariePierreLessard to get the weather forecast for that hour since the data is
    provided in the fetched object as an array. It's easy because the index at which the weather conditions 
    for the relevant hour are found corresponds to the time of day exactly. 
    For instance, if the time of day is 1 o'clock at night, the index is 1. 
    0 is for the period between 00:00 and 01:00. */
    const currentTimeOfDayByMariePierreLessard = currentDateAndTimeByMariePierreLessard.getHours();
    /* This logs the correct time of day. 
    console.log(currentTimeOfDayByMariePierreLessard);
    */
    const fetchedDateTimeIso8601ByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.time[currentTimeOfDayByMariePierreLessard];
    /* The following doesn't work because toLocaleDateString doesn't work on sth that is already a string.
    Obviously (what was I thinking)! 
    const completeDateTimeIso8601ByMariePierreLessard = fetchedDateTimeIso8601ByMariePierreLessard+":00:000+01:00";
    const localisedDateTimeByMariePierreLessard = completeDateTimeIso8601ByMariePierreLessard.toLocaleDateString("da-DK");
    Source of .toLocaleDateString("da-DK"):
    https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp
    */
    /* "The substring() method extracts characters, between two indices (positions), from a string, and returns the substring.
    The substring() method extracts characters from start to end (exclusive)."
    https://www.w3schools.com/jsref/jsref_substring.asp
    */
    const fetchedDateByMariePierreLessard = fetchedDateTimeIso8601ByMariePierreLessard.substring(0, 10);
    //console.log(fetchedDateByMariePierreLessard);
    const fetchedHourByMariePierreLessard = fetchedDateTimeIso8601ByMariePierreLessard.substring(11, 16);
    //console.log(fetchedHourByMariePierreLessard);

    /* Localisation of numbers:
    Conversion of strings with . as decimal separator to strings with , as decimal separator
    "The replace() method searches a string for a value or a regular expression.
    The replace() method returns a new string with the value(s) replaced.
    The replace() method does not change the original string."
    https://www.w3schools.com/jsref/jsref_replace.asp
    */
    const fetchedTemperature2mByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.temperature_2m[currentTimeOfDayByMariePierreLessard].toString();
    const localisedTemperature2mByMariePierreLessard = fetchedTemperature2mByMariePierreLessard.replace(".", ",");
    const fetchedApparentTemperatureByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.apparent_temperature[currentTimeOfDayByMariePierreLessard].toString();
    const localisedApparentTemperatureByMariePierreLessard = fetchedApparentTemperatureByMariePierreLessard.replace(".", ",");
    const fetchedPrecipitationByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.precipitation[currentTimeOfDayByMariePierreLessard].toString();
    const localisedPrecipitationByMariePierreLessard = fetchedPrecipitationByMariePierreLessard.replace(".", ",");
    const fetchedSnowfallByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.snowfall[currentTimeOfDayByMariePierreLessard].toString();
    const localisedSnowfallByMariePierreLessard = fetchedSnowfallByMariePierreLessard.replace(".", ",");
    const fetchedRainByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.rain[currentTimeOfDayByMariePierreLessard].toString();
    const localisedRainByMariePierreLessard = fetchedRainByMariePierreLessard.replace(".", ",");
    const fetchedWindSpeed10mByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.wind_speed_10m[currentTimeOfDayByMariePierreLessard].toString();
    const localisedWindSpeed10mByMariePierreLessard = fetchedWindSpeed10mByMariePierreLessard.replace(".", ",");
    const fetchedWindDirection10mByMariePierreLessard = hourlyWeatherDataByMariePierreLessard.hourly.wind_direction_10m[currentTimeOfDayByMariePierreLessard].toString();
    const localisedWindDirection10mByMariePierreLessard = fetchedWindDirection10mByMariePierreLessard.replace(".", ",");

    const [imageToDisplayByMariePierreLessard, setImageToDisplayByMariePierreLessard] = useState<string>("../assets/snowy background 1609.jpg");
    const [weatherNameByMariePierreLessard, setWeatherNameByMariePierreLessard] = useState<string>("Snevejr");

    useEffect(() => {
        if (fetchedSnowfallByMariePierreLessard > 0) {
            setImageToDisplayByMariePierreLessard(snow);
            setWeatherNameByMariePierreLessard("Snevejr");
            // console.log(imageToDisplayByMariePierreLessard);
        } else if (fetchedRainByMariePierreLessard > 0) {
            setImageToDisplayByMariePierreLessard(rain);
            setWeatherNameByMariePierreLessard("Regnvejr");
            // console.log(imageToDisplayByMariePierreLessard);
        } else {
            setImageToDisplayByMariePierreLessard(sunshine);
            setWeatherNameByMariePierreLessard("Solskin");
            // console.log(imageToDisplayByMariePierreLessard);
        };
    });

    /* Kilder for at forstå meteorologiske begreber:
    "Once wind direction is measured, it can be reported in either cardinal directions or degrees:
    Cardinal Directions: It is important to note the direction from which the wind is blowing. For example, a westerly wind blows from west to east.
    Degrees: Alternatively, the wind can be reported in clockwise degrees counting from the north, which corresponds to 0°. Thus, 90° is equivalent to the east, 180° is equivalent to the south, and 270° is equivalent to the west."
    https://www.windcrane.com/blog/windcrane-general/how-measure-wind-direction
     */
    return (
        <SectionH1to2ByMariePierreLessard
            id={"home"}
            h1={`${activeNavItemByMariePierreLessard}`}
            h2={"Nuværende vejrudsigt omkring TechCollege, Aalborg, Danmark"}
        >
            <p>Tid og dato: {fetchedDateByMariePierreLessard} {fetchedHourByMariePierreLessard}</p>
            {/* elevation in EN */}
            <p>Kote over havets overflade: {hourlyWeatherDataByMariePierreLessard.elevation}&nbsp;m</p>
            <GridByMariePierreLessard className={gridstyling.responsiveGridWoPassePartoutByMariePierreLessard}>
                <ImgComponentByMariePierreLessard
                    src={imageToDisplayByMariePierreLessard}
                    alt={weatherNameByMariePierreLessard}
                    loading={"eager"}
                />
                <div>
                    <div>
                        {/* Source for degree symbol as a HTML entity: 
                https://www.shecodes.io/athena/27147-how-to-write-the-degree-symbol-in-html */}
                        <p>Temperatur på 2 m: {localisedTemperature2mByMariePierreLessard}&nbsp;&deg;C</p>
                        {/* relative_humidity in EN */}
                        <p>Relativ luftfugtighed på 2 m: {hourlyWeatherDataByMariePierreLessard.hourly.relative_humidity_2m[currentTimeOfDayByMariePierreLessard]}&nbsp;%</p>
                        {/* apparent temperature in EN */}
                        <p>Følt temperatur: {localisedApparentTemperatureByMariePierreLessard}&nbsp;&deg;C</p>
                    </div>
                    <div>
                        {/* precipitation in EN */}
                        <p>Nedbør: {localisedPrecipitationByMariePierreLessard}&nbsp;mm</p>
                        <p>Snefald: {localisedSnowfallByMariePierreLessard}&nbsp;cm</p>
                        <p>Regn: {localisedRainByMariePierreLessard}&nbsp;mm</p>
                    </div>
                    <div>
                        <p>Vindhastighed på 10 m: {localisedWindSpeed10mByMariePierreLessard}&nbsp;km/t</p>
                        <p>Vindretning på 10 m: {localisedWindDirection10mByMariePierreLessard}&deg;</p>
                    </div>
                    <div>
                        {/* visibility in EN */}
                        <p>Sigtbarhed: {hourlyWeatherDataByMariePierreLessard.hourly.visibility[currentTimeOfDayByMariePierreLessard]}&nbsp;m</p>
                        {/* Source of model for this conditional with ternary operator: 
                    https://react.dev/learn/conditional-rendering */}
                        <p>Er der daglys? {hourlyWeatherDataByMariePierreLessard.hourly.is_day[currentTimeOfDayByMariePierreLessard] === 0 ? ("Nej") : ("Ja")}</p>
                    </div>
                    <div>
                        {/* cloud cover in EN */}
                        <p>Skydække: {hourlyWeatherDataByMariePierreLessard.hourly.cloud_cover[currentTimeOfDayByMariePierreLessard]}&nbsp;%</p>
                        <p>Skydække på 2 m (tåge): {hourlyWeatherDataByMariePierreLessard.hourly.cloud_cover_2m[currentTimeOfDayByMariePierreLessard]}&nbsp;%</p>
                    </div>
                    <p>WMO-vejrkode: {hourlyWeatherDataByMariePierreLessard.hourly.weather_code[currentTimeOfDayByMariePierreLessard]}</p>
                </div>
            </GridByMariePierreLessard>
        </SectionH1to2ByMariePierreLessard>
    );
};