/* Source of the following component, incl. course notes:
- Min tidligere opgave react-gallery-wrapper
*/

import sharedstyles from "../../styles/globals.module.scss";
import headerstyling from "./g-header.module.scss";

export function GlobalHeaderByMariePierreLessard() {
    return(
        <header className={`
            ${headerstyling.gHeaderByMariePierreLessard} 
        `}>
            <div className={`
                ${sharedstyles.wrapperByMariePierreLessard}
                ${sharedstyles.secondaryWrapperByMariePierreLessard}
                ${sharedstyles.centeredSelfByMariePierreLessard}
            `}>
                react-vejr-app
            </div>
        </header>
    );
};
