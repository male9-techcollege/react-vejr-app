/* Source of the following component, incl. course notes:
- Min tidligere opgave react-gallery-wrapper
*/

/* The following module does style the small element (no class name given) */
import typography from "../../styles/typography.module.scss";
import sharedstyles from "../../styles/globals.module.scss";
import footerstyling from "./g-footer.module.scss";

export function GlobalFooterByMariePierreLessard() {
    return (
        <footer id="globalFooter" className={`
            ${footerstyling.gFooterByMariePierreLessard} 
        `}>
            <div className={`
                ${sharedstyles.wrapperByMariePierreLessard}
                ${sharedstyles.secondaryWrapperByMariePierreLessard}
                ${sharedstyles.centeredSelfByMariePierreLessard}
            `}>
                <small>
                    &copy; 2026. Kodning af Marie-Pierre Lessard. Licens: MIT (obligatorisk kreditering). Vejroplysningerne blev hentet via Open-Meteo.com (licens: CC BY 4.0.). Lokationsdataene stemmer fra OpenStreetMaps.org (licens: Database Contents License (DbCL) v. 1.0). Yderligere oplysninger kan findes på siden Om opgaven.
                </small>
            </div>
        </footer>
    );
};
