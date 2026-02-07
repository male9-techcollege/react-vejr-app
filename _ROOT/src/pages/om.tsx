/* Source for the creation of pages:
- react-router-codealong-med-kasper
- Min tidligere opgave react-gallery-wrapper
*/
import { useOutletContext } from "react-router";
import gridstyling from "../components/shared/atoms/grid.module.scss";
import aboutstyling from "./om.module.scss";

import { SectionH1to2ByMariePierreLessard } from "../components/main-el/section-h1-2";
import { GridByMariePierreLessard } from "../components/shared/atoms/grid";
import { SectionH2ByMariePierreLessard } from "../components/main-el/section-h2";

export const AboutByMariePierreLessard = ()=> {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx 
    Interestingly, I get an error until I specify that the type of useOutletContext is any.
    I tried with <string>, but it doesn't work, even though the only prop sent is typed as a string in global-layout.tsx. 
    I am guessing that the react-router people might prefer useOutletContext to always have the type any because it is
    a context that can pass a whole variety of props. The app is more future-proof that way... */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    return (
        <>
            <SectionH1to2ByMariePierreLessard
                id={"about"}
                h1={`${activeNavItemByMariePierreLessard}`}
                h2={"Copyright og kreditering"}
            >
                <GridByMariePierreLessard className={gridstyling.responsiveGridWoPassePartoutByMariePierreLessard}>
                    <div>
                        <h3>Om udvikleren</h3>
                        <p>Den nærværende opgave skal afleveres i stadier via GitHub-platformen til TechCollege, Aalborg, Danmark. Opgaven hører til eleven Marie-Pierre Lessard. Vilkårene af den følgende MIT-licens gælder.</p>
                        <h4>MIT License</h4>
                        <p>Copyright (c) 2026 Marie-Pierre Hélène Lessard</p>
                        <p>
                            Permission is hereby granted, free of charge, to any person obtaining a copy
                            of this software and associated documentation files (the "Software"), to deal
                            in the Software without restriction, including without limitation the rights
                            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                            copies of the Software, and to permit persons to whom the Software is
                            furnished to do so, subject to the following conditions:
                        </p>
                        <p>
                            The above copyright notice and this permission notice shall be included in all
                            copies or substantial portions of the Software.
                        </p>
                        <p>
                            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                            SOFTWARE.
                        </p>
                    </div>
                    <div>
                        <h3>Open-Meteos API og DMI's data</h3>
                        <p>Til opgaven skal eleverne bruge <a href="https://open-meteo.com/en/docs/dmi-api" target="_blank" rel="noopener noreferrer">den gratis vejr-API fra Open-Meteo.com</a>, som giver adgang til vejrudsigter fra Danmarks Meteorologiske Institut (DMI).</p>
                        {/* TO DO use list-style-position:inside; for these lists, to bring bullets to the right */}
                        <ul className={aboutstyling.bulletsInside}>
                            <li>Open-Meteos licens er <a href="https://creativecommons.org/licenses/by/4.0" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Der bliver ingen ændring til Open-Meteos API, da opgaven udelukkende er en frontend-opgave.</li>
                            <li>Open-Meteo bruger data fra Danmarks Meteorologiske Institut (DMI). <a href="https://open-meteo.com/en/docs" target="_blank" rel="noopener noreferrer">DMI's data må ikke bruges til kommercielle formål.</a></li>
                        </ul>
                        <h3>OpenStreetMaps database</h3>
                        <p>TechColleges breddegrad og længdegrad blev fundet i en opensource-kilde, som hedder <a href="https://nominatim.openstreetmap.org/ui/details.html?osmtype=N&osmid=343076498&class=place" target="_blank" rel="noopener noreferrer">OpenStreetMap.org</a>. OpenStreetMaps kortdata stemmer fra et fællesskab, som allesammen kan blive en del af. OpenStreetMaps vilkår ligger <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">her</a>. Licensen for disse data hedder: <a href="https://opendatacommons.org/licenses/dbcl/1-0" target="_blank" rel="noopener noreferrer">"Database Contents License (DbCL) v1.0"</a>. Den følgende erklæring er påkrævet.</p>
                        <p>I den nærværende webapps kodning, er TechColleges breddegrad og længdegrad inkluderet. Disse oplysninger er under en licens, som hedder "Database Contents License" og kan findes på adressen <a href="http://opendatacommons.org/licenses/dbcl/1.0" target="_blank" rel="noopener noreferrer">http://opendatacommons.org/licenses/dbcl/1.0</a>. Disse data blev hverken ændret eller udvidet, og OpenStreetMaps database, som er gjort tilgængelig under en licens, som hedder "Open Database License" og som kan findes på adressen <a href="http://opendatacommons.org/licenses/odbl/1.0" target="_blank" rel="noopener noreferrer">http://opendatacommons.org/licenses/odbl/1.0</a>, blev udelukkende brugt til en søgning på OpenStreetMaps egen side.</p>
                    </div>
                </GridByMariePierreLessard>
            </SectionH1to2ByMariePierreLessard>
            <SectionH2ByMariePierreLessard
                h2={"Teknologier"}
            >
                    <p>Den nærværende opgave bruger de følgende teknologier:</p>
                    <ul className={aboutstyling.bulletsInside}>
                        <li><a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer">Node.js</a></li>
                        <li><a href="https://vite.dev/guide" target=" _blank" rel="noopener noreferrer">Vite</a></li>
                        <li><a href="https://www.npmjs.com/package/typescript" target=" _blank" rel="noopener noreferrer">TypeScript</a></li>
                        <li><a href="https://www.npmjs.com/package/sass" target=" _blank" rel="noopener noreferrer">Sass</a></li>
                        <li><a href="https://www.npmjs.com/package/react" target=" _blank" rel="noopener noreferrer">React</a></li>
                        <li><a href="https://www.npmjs.com/package/react-router" target=" _blank" rel="noopener noreferrer">React Router</a></li>
                        <li><a href="https://www.npmjs.com/package/openmeteo" target=" _blank" rel="noopener noreferrer">Open-Meteo API Typescript SDK</a></li>
                        <li><a href="https://marketplace.visualstudio.com/items?itemName=doggy8088.quicktype-refresh" target=" _blank" rel="noopener noreferrer">Paste JSON as Code (Refresh)</a></li>
                    </ul>
            </SectionH2ByMariePierreLessard>
        </>
    );
};