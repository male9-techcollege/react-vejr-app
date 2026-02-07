/* Opgave: Lav en vejr app
(Vi fik at vide mundtligt, at vi ikke var nødt til at arbejde i hold på denne opgave.)
Byg en vejr applikation med live data fra Open-Meteo API. 
- Designet er valgfrit, men det skal være efter "mobile-first" princippet.
- Brugen af GitHub-issues og projekt ville være en fordel og indgår i bedømmelsen. Lav en plan inden kodningen starter.
- Applikation skal have følgende tre sider: 
-- En "Hovedside" der viser en detaljeret oversigt over det aktuelle vejr for jeres lokation
-- En "Prognose" side der viser det kommende vejr de næste 3 dage (kort oversigt)
-- En "Om" side der forklarer hvilke teknologier appen bruger, samt deler relevante links til evt. styling biblioteker, icon biblioteker, API´er og andre node packages i har brugt.
Derudover skal appen være opbygget semantisk korrekt i HTML og den skal selvfølgelig være skrevet i Reacts .TSX/.JSX format. 
Der skal være en README.md fil, der beskriver projektet og hvem arbejdede på det.

Resourcer:
Link til API: https://open-meteo.com/
*/
/* Sources for the creation of a router, incl. course notes:
- react-router-codealong-med-kasper
- Min tidligere opgave react-gallery-wrapper
*/
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.scss";
import { GlobalLayoutByMariePierreLessard } from "./layouts/global-layout";
import { HomeByMariePierreLessard } from "./pages/home";
import { PrognosisByMariePierreLessard } from "./pages/prognose";
import { AboutByMariePierreLessard } from "./pages/om";
import { ErrorPageByMariePierreLessard } from "./pages/notfound";

/* Source for way to fold regions in .jsx files: https://stackoverflow.com/questions/58882591/region-for-jsx */
// #region Sources about routing (3 routing modes; client-side routing vs. server-side routing), routes, slugs
/* Declarative routing (simple compared to other options)
The following will give:
http://localhost:port/<enter path here; include initial slash in relative path, obviously!>

"There are three primary ways, or "modes", to use it in your app, so there are three guides to get you started.
Declarative
Data
Framework"
https://reactrouter.com/home

Question I asked myself: what is the difference between a slug and a route?
A slug is part of a route. The slug doesn't include the slash, as the following source shows.
"When Next.js sees this folder:
app/blog/[slug]/page.js
It understands:
[slug] is a variable
This page can handle any blog URL
The value will come from the URL itself"
https://medium.com/codetodeploy/dynamic-routes-slugs-in-next-js-how-real-world-apps-design-their-urls-16f681869c21

Reading about client-side routing with BrowserRouter vs. server-side routing:
"A declarative <Router> using the browser History API for client-side routing. (...)
<Route> components describing your route configuration"
https://reactrouter.com/api/declarative-routers/BrowserRouter

"2. How does client-side routing in React Router differ from traditional server-side routing?
In client-side routing (used by React Router), only a portion of the page changes when navigating between routes, as React handles the navigation and updates the URL without a page reload. In server-side routing, each navigation request triggers a full page load from the server, causing the entire page to reload.
3. What is the purpose of <BrowserRouter>, and how does it differ from <HashRouter>?
<BrowserRouter> uses the HTML5 history API to create clean, user-friendly URLs without hash symbols. <HashRouter>, on the other hand, uses the hash portion of the URL (e.g., /#) and is useful for simpler setups where you want to avoid configuring the server to handle different paths."
https://souvikmajumder31.medium.com/full-stack-developer-interview-questions-2024-part-1-react-js-fb2a413099d0

Research about <Routes> and <Route>:
The following are component routes according to the react-router documentation.
"Component Routes
You can also use components that match the URL to elements anywhere in the component tree: (...)
Note that these routes do not participate in data loading, actions, code splitting, or any other route module features,
so their use cases are more limited than those of the route module."
https://reactrouter.com/start/framework/routing
In that documentation page, the component called <Routes> is only used with
individual <Route> elements (component routes)
and vice versa.
"5. What is the <Switch> (or <Routes> in v6) component, and why is it useful?
<Switch> (in v5) or <Routes> (in v6) renders the first matching route within its children, ensuring that only one route is rendered at a time. In React Router v6, <Routes> replaced <Switch> to offer a more streamlined API."
https://souvikmajumder31.medium.com/full-stack-developer-interview-questions-2024-part-1-react-js-fb2a413099d0

*/
// #endregion 
function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* The layout route has no path attribute.
                    It contains the elements with a path attribute which will be rendered with the given CSS styling for the layout. */}
                    {/* The element= prop of <Route> is for the component declared in pages or layouts folder. */}
                    <Route element={<GlobalLayoutByMariePierreLessard />} >
                        {/* It is possible to write the following instead of index: 
                        <Route path="/" element={<Home />} />
                        */}
                        <Route index element={<HomeByMariePierreLessard />} />
                        <Route path="/prognose" element={<PrognosisByMariePierreLessard />} /> 
                        <Route path="/about" element={<AboutByMariePierreLessard />} />
                        {/* Fallback page, i.e. error 404 page (in case user enters wrong URL) 
          
                        The wildcard (*) means all paths. In previous versions of react-router, this path with a wildcard had to be listed
                        at the end because the routes were read in order. Now, it doesn't seem to matter. 
                        */}
                        <Route path="/*" element={<ErrorPageByMariePierreLessard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
