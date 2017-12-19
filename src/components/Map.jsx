import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "markers": null,
            "selectedMarker": null,
            "errorMessage": null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google || prevProps.venues !== this.props.venues) {
            this.loadMap(prevProps.google !== this.props.google);
        }

        if (this.props.selectedVenue && prevProps.selectedVenue !== this.props.selectedVenue) {
            this.animateMarker(this.state.markers[this.props.selectedVenue.id]);
        }
    }

    componentDidMount() {
        this.loadMap(true);
    }

    render() {
        const style = {
            "width": "50%",
            "height": "97vh",
            "display": "inline-block",
            "tabIndex": 4
        };
        if (this.props.loaded) {
            return (
                <article ref="map" style={style}>
                    Loading...
                </article>
            );
        } else {
            return (
                <article ref="map" style={style}>
                    Failed to load map
                </article>
            );
        }

    }

    clearMarkers() {
        const self = this;
        const {
            markers
        } = self.state;

        if (markers) {
            const currentVenuesWithMarkers = Object.keys(markers);
            currentVenuesWithMarkers.forEach(function (venueId) {
                markers[venueId].setMap(null);
            });
        }
    }

    animateMarker(marker) {
        this.map.setCenter(marker.position);
        marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 2800);
    }

    loadMap(shouldRefresh) {
        const self = this;

        if (self.props && self.props.google) {
            const {
                google,
                lat,
                long,
                zoom,
                venues
            } = self.props;
            const maps = google.maps;

            if (shouldRefresh) {
                const mapRef = self.refs.map;
                const mapsDOMNode = ReactDOM.findDOMNode(mapRef);

                const mapConfig = {
                    "center": new maps.LatLng(lat, long),
                    "zoom": zoom
                };
                self.map = new maps.Map(mapsDOMNode, mapConfig);
            }

            self.clearMarkers();

            const venueMarkers = {};
            venues.forEach(function (venue) {
                let venueMarker;
                if (self.state.markers && self.state.markers[venue.id]) {
                    venueMarker = self.state.markers[venue.id];
                    venueMarker.setMap(self.map);
                } else {
                    venueMarker = new maps.Marker({
                        "position": new maps.LatLng(venue.location.lat, venue.location.lng),
                        "map": self.map
                    });
                    venueMarker.addListener("click", function () {
                        self.animateMarker(venueMarker);
                        self.props.onMarkerClicked(venue.id);
                    });
                    venueMarkers[venue.id] = venueMarker;
                }
            });

            if (!this.state.markers) {
                this.setState({
                    markers: venueMarkers
                });
            }
        }
    }
}

Map.propTypes = {
    "google": PropTypes.object,
    "zoom": PropTypes.number,
    "lat": PropTypes.number,
    "long": PropTypes.number
};

Map.defaultProps = {
    zoom: 10,
    lat: 49.24966,
    long: -123.11934
}; //Vancouver