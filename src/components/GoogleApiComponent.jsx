import React from "react";

import ScriptCache from "../ScriptCache";

import Map from "./Map";

const GoogleApi = function (opts) {
    opts = opts || {};

    const apiKey = opts.apiKey;
    const libraries = opts.libraries || [];
    const client = opts.client;
    const URL = "https://maps.googleapis.com/maps/api/js";

    const googleVersion = "3.29";
    let channel = null;
    let language = null;
    let region = null;

    const url = () => {
        let url = URL;
        let params = {
            key: apiKey,
            callback: "CALLBACK_NAME",
            libraries: libraries.join(","),
            client: client,
            v: googleVersion,
            channel: channel,
            language: language,
            region: region
        };

        let paramStr = Object.keys(params)
            .filter(k => !!params[k])
            .map(k => `${k}=${params[k]}`).join("&");

        return `${url}?${paramStr}`;
    };

    return url();
};

export default class GoogleApiWrapper extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            "loaded": false,
            "google": null
        };
    }

    componentWillMount() {
        this.scriptCache = ScriptCache({
            "google": GoogleApi({
                "apiKey": "AIzaSyBdZbQEAHpQdhfD9SAazeURCAHCGWshva0",
                "libraries": ["places"]
            })
        });
    }

    componentDidMount() {

        this.scriptCache.google.onLoad((err, tag) => {
            if (err) {
                this.setState({
                    "loaded": false,
                    "google": null
                });
            } else {
                this.setState({
                    "loaded": true,
                    "google": window.google
                });
            }
        });

    }

    render() {
        const props = Object.assign({}, this.props, {
            loaded: this.state.loaded,
            google: this.state.google,
            zoom: 13,
            lat: 49.24966,
            long: -123.11934
        });
        return (
            <Map {...props} />
        );
    }
}

