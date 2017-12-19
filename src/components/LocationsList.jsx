import React from "react";

import LocationItem from "./LocationItem";

export default class LocationsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "selectedVenue": null
        };
    }

    onLocationItemClicked(venue) {
        this.setState({
            "selectedVenue": venue
        });
        this.props.onLocationItemClicked(venue);
    }

    render() {
        const locationItemComponents = [];
        const {
            venues
        } = this.props;
        for (let i = 0; i < venues.length; i++) {
            let venue = venues[i];
            locationItemComponents.push(
                <LocationItem
                    key={venue.id}
                    venue={venue}
                    onLocationItemClicked={this.onLocationItemClicked.bind(this)} />
            );
        }
        const style = {
            padding: "10px",
            height: "60vh",
            overflowY: "auto"
        };
        return (
            <section>
                <h4>List of Locations</h4>
                <div style={style}>
                    {locationItemComponents}
                </div>
            </section>
        );
    }
}