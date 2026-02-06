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
    /* TO DO Put this code out of the comment when I am done.
    This is just to hide useEffect and avoid making too many API calls as I work on displaying the data
    and test my code.  
    
    useEffect(() => {
        fetch(hourlyWeatherUrlByMariePierreLessard)
            .then((res) => res.json())
            .then((data) => setHourlyWeatherDataByMariePierreLessard(data));
    }, []);
    */
    /* Keep the following reminders:
    1. The setter has to be in useEffect, otherwise there is an infinite loop. It is because React re-renders every time 
    a state changes.

    useEffect(() => {
        setHourlyWeatherDataByMariePierreLessard(currentSample);
    }, []);

    2. The above doesn't work every time, actually! 
    Not unless the useState hook has default data to put in the state. In the absence of data
    in the state on mounting, errors are thrown because the template doesn't have the required data to show yet. useEffect
    takes too long to run, even if it's just milliseconds.
    
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
    but I think that solving that issue would be beyong the learning goals of this exercise. */
    /* "The Date() constructor creates Date objects. When called as a function, it returns a string representing the current time."
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date */
    const currentDateAndTimeByMariePierreLessard = new Date();
    /* "The getHours() method of Date instances returns the hours for this date according to local time."
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours 
    It only returns the hour as an integer (no following minutes).
    */
    /* TO DO: use currentTimeOfDayByMariePierreLessard to get the weather forecast for that hour since the data is
    provided as an array. */
    const currentTimeOfDayByMariePierreLessard = currentDateAndTimeByMariePierreLessard.getHours();
    /* This logs the correct time of day. */
    console.log(currentTimeOfDayByMariePierreLessard);

    console.log(hourlyWeatherDataByMariePierreLessard);
    // console.log(hourlyWeatherDataByMariePierreLessard.elevation);

    return (
        <SectionH1to2ByMariePierreLessard
            id={"home"}
            h1={`${activeNavItemByMariePierreLessard}`}
            h2={"Nuværende vejrudsigt omkring TechCollege, Aalborg, Danmark"}
        >
            <GridByMariePierreLessard className={gridstyling.responsiveGridWoPassePartoutByMariePierreLessard}>
                {/* Elevation in EN */}
                <p>Kote over havets overflade: {hourlyWeatherDataByMariePierreLessard.elevation} m</p> 
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </GridByMariePierreLessard>
        </SectionH1to2ByMariePierreLessard>
    );
};