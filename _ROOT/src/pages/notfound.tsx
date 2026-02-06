/* Source for the creation of pages:
- react-router-codealong-med-kasper
- Min tidligere opgave react-gallery-wrapper
*/
import { Link } from "react-router";
/* The following module does style the h1 (no class name given) */
import typography from "../styles/typography.module.scss";

export const ErrorPageByMariePierreLessard = ()=> {
    return (
        <>
            <h1>Fejl 404: siden blev ikke fundet</h1>
            <Link to="/">Gå tilbage til forsiden</Link>
        </>
    );
};
