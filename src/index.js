import React from "react";
import ReactDOM from "react-dom";

import MapApplication from "./components/MapApplication";
import registerServiceWorker from "./registerServiceWorker";
import Foursquare from "./Foursquare";
import cachedVenues from "./cachedVenues";

new Foursquare()
    .exploreVenues()
    .then(function (venues) {
        console.log(JSON.stringify(venues));
        ReactDOM.render(
            <MapApplication venues={venues} error={null} />, document.getElementById("root")
        );
    }).catch(function (err) {
        let errorMessage = "Failed to load data from foursquare";
        const shouldShowRawMessage = false;
        if (shouldShowRawMessage) {
            errorMessage = err.message;
        }
        ReactDOM.render(
            <MapApplication venues={cachedVenues} error={null} />, document.getElementById("root")
        );
    });

registerServiceWorker();