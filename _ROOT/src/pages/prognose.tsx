/* Source for the creation of pages:
- react-fetch-codealong-med-kasper
- react-router-codealong-med-kasper
- react-wallywood-codealong-med-kasper (Math.round())
- Min tidligere opgave react-gallery-wrapper
*/
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { placeholderThreeDays } from "../data/openmeteo-placeholders";

import flexcontainerstyling from "../components/shared/atoms/flex-container.module.scss";
import cardstyling from "../components/shared/m-and-o/card.module.scss";

import { SectionH1to2ByMariePierreLessard } from "../components/main-el/section-h1-2";
import { FlexContainerWithUlByMariePierreLessard } from "../components/shared/atoms/flex-container";
import {
    CardWithSectionByMariePierreLessard
} from "../components/shared/m-and-o/card";
import {
    CardBodyByMariePierreLessard
} from "../components/shared/atoms/card-parts";
import { HeadingElByMariePierreLessard } from "../components/shared/atoms/heading";

export const PrognosisByMariePierreLessard = () => {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx
    See also experimentation notes in home.tsx 
    */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    const dailyWeatherUrlByMariePierreLessard = "https://api.open-meteo.com/v1/forecast?latitude=57.04768&longitude=9.967618&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset,daylight_duration,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours&timezone=Europe%2FBerlin&forecast_days=3&models=dmi_seamless";
    const [dailyWeatherDataByMariePierreLessard, setDailyWeatherDataByMariePierreLessard] = useState<any>(placeholderThreeDays);

    /* TO DO Put this code out of the comment when I am done with programming. Then hide again to do styling.
    This is just to hide useEffect and avoid making too many API calls as I work on displaying the data
    and test my code.  
    
    useEffect(() => {
        fetch(dailyWeatherUrlByMariePierreLessard)
            .then((res) => res.json())
            .then((data) => setDailyWeatherDataByMariePierreLessard(data));
    }, []);
    */

    {/* Maybe TO DO: 
        An unordered list as a container for cards? */}
    /* Source for the use of a for loop outside of the return statement in order to generate components,
    which are inserted in the return statement with a constant ("variable"): 
    https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
    */
    const WeatherCardArrayByMariePierreLessard = [];
    for (let i = 0; i < 3; i++) {

        const daylightDurationinHoursByMariePierreLessard = Math.round(dailyWeatherDataByMariePierreLessard.daily.daylight_duration[i] / 60 / 60);

        /* Localisation of numbers:
        TO DO
        Conversion of strings with . as decimal separator to strings with , as decimal separator
        "The replace() method searches a string for a value or a regular expression.
        The replace() method returns a new string with the value(s) replaced.
        The replace() method does not change the original string."
        https://www.w3schools.com/jsref/jsref_replace.asp
        */
        const fetchedMinTemperature2mByMariePierreLessard = dailyWeatherDataByMariePierreLessard.daily.temperature_2m_min[i].toString();
        const localisedMinTemperature2mByMariePierreLessard = fetchedMinTemperature2mByMariePierreLessard.replace(".", ",");
        const fetchedMaxTemperatureByMariePierreLessard = dailyWeatherDataByMariePierreLessard.daily.temperature_2m_max[i].toString();
        const localisedMaxTemperatureByMariePierreLessard = fetchedMaxTemperatureByMariePierreLessard.replace(".", ",");
        const fetchedMaxWindSpeed10mByMariePierreLessard = dailyWeatherDataByMariePierreLessard.daily.wind_speed_10m_max[i].toString();
        const localisedMaxWindSpeed10mByMariePierreLessard = fetchedMaxWindSpeed10mByMariePierreLessard.replace(".", ",");
        const fetchedPrecipitationByMariePierreLessard = dailyWeatherDataByMariePierreLessard.daily.precipitation_sum[i].toString();
        const localisedPrecipitationByMariePierreLessard = fetchedPrecipitationByMariePierreLessard.replace(".", ",");
        const fetchedRainByMariePierreLessard = dailyWeatherDataByMariePierreLessard.daily.rain_sum[i].toString();
        const localisedRainByMariePierreLessard = fetchedRainByMariePierreLessard.replace(".", ",");
        const fetchedSnowfallByMariePierreLessard = dailyWeatherDataByMariePierreLessard.daily.snowfall_sum[i].toString();
        const localisedSnowfallByMariePierreLessard = fetchedSnowfallByMariePierreLessard.replace(".", ",");

        WeatherCardArrayByMariePierreLessard.push(
            <li>
                <CardWithSectionByMariePierreLessard key={i}
                    className={cardstyling.unresponsiveFlexedCardAlwaysVerticalByMariePierreLessard}
                >
                    <HeadingElByMariePierreLessard headingNr={3} headingText={dailyWeatherDataByMariePierreLessard.daily.time[i]} />
                    <CardBodyByMariePierreLessard
                        className={cardstyling.bodyTextByMariePierreLessard}
                    >
                        <div>
                            <p>Minimums- og maksimumstemperatur på 2 m: {localisedMinTemperature2mByMariePierreLessard} til {localisedMaxTemperatureByMariePierreLessard}&nbsp;&deg;C</p>
                            <p>Maksimal vindhastighed på 10 m: {localisedMaxWindSpeed10mByMariePierreLessard}&nbsp;km/t</p>
                            {/* dominant wind direction in EN */}
                            <p>Fremherskende vindretning på 10 m: {dailyWeatherDataByMariePierreLessard.daily.wind_direction_10m_dominant[i]}&deg;</p>
                        </div>
                        <div>
                            {/* precipitation in EN */}
                            <p>Nedbør: {localisedPrecipitationByMariePierreLessard}&nbsp;mm</p>
                            <p>Regn: {localisedRainByMariePierreLessard}&nbsp;mm</p>
                            <p>Snefald: {localisedSnowfallByMariePierreLessard}&nbsp;cm</p>
                            <p>Nedbørtimetal: {dailyWeatherDataByMariePierreLessard.daily.precipitation_hours[i]}&nbsp;t</p>
                        </div>
                        <div>
                            {/* "The substring() method extracts characters, between two indices (positions), from a string, and returns the substring.
                        The substring() method extracts characters from start to end (exclusive)."
                        https://www.w3schools.com/jsref/jsref_substring.asp */}
                            <p>Solopgang/solnedgang: {dailyWeatherDataByMariePierreLessard.daily.sunrise[i].substring(11, 16)}/{dailyWeatherDataByMariePierreLessard.daily.sunset[i].substring(11, 16)}</p>
                            {/* daylight duration or sunshine duration in EN */}
                            <p>Soltimetal: {daylightDurationinHoursByMariePierreLessard}&nbsp;t</p>
                            <p>WMO-vejrkode: {dailyWeatherDataByMariePierreLessard.daily.weather_code[i]}</p>
                        </div>
                    </CardBodyByMariePierreLessard>
                </CardWithSectionByMariePierreLessard>
            </li>
        );
    };

    return (
        <SectionH1to2ByMariePierreLessard
            id={"prognose"}
            h1={`${activeNavItemByMariePierreLessard}`}
            h2={"Vejret for i dag og de to følgende dage omkring TechCollege, Aalborg, Danmark"}
        >
            {/* elevation in EN */}
            <p>Kote over havets overflade: {dailyWeatherDataByMariePierreLessard.elevation}&nbsp;m</p>
            <FlexContainerWithUlByMariePierreLessard className={flexcontainerstyling.responsiveFlexContainerWoPassePartoutWithUlByMariePierreLessard}>
                {WeatherCardArrayByMariePierreLessard}
            </FlexContainerWithUlByMariePierreLessard>
        </SectionH1to2ByMariePierreLessard>
    );
};