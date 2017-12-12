import React from "react";
import GoogleApiComponent from "./GoogleApiComponent";
import Sidebar from "./Sidebar";

export default class MapApplication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "venues": [],
            "inputFilter": "",
            "isMenuOpen": false,
            "filteredVenues": [],
            "selectedVenue": null,
            "selectedMarkerVenue": null
        };
    }

    componentDidMount() {
        const {
            venues
        } = this.props;
        this.setState({
            "venues": venues,
            "inputFilter": "",
            "isMenuOpen": false,
            "filteredVenues": venues,
            "selectedVenue": null,
            "selectedMarkerVenue": null
        });
    }

    getFilteredVenues(filter) {
        if (!filter || filter === "") {
            return this.props.venues;
        } else {
            return this.props.venues.filter(function (item) {
                return item.name.toLowerCase().includes(filter.toLowerCase());
            });
        }
    }

    onFilterInputChanged(newInput) {
        const { venues, isMenuOpen } = this.state;
        const filteredVenues = this.getFilteredVenues(newInput);
        this.setState({
            venues: venues,
            isMenuOpen: isMenuOpen,
            inputFilter: newInput,
            filteredVenues: filteredVenues
        });
    }

    onMarkerClicked(venueId) {
        this.setState(Object.assign({}, this.state, {
            "selectedMarkerVenue": venueId
        }));
    }

    onLocationItemClicked(venue) {
        this.setState(Object.assign({}, this.state, {
            "selectedVenue": venue
        }));
    }

    toggleMenuVisibility() {
        const { isMenuOpen } = this.state;
        this.setState(Object.assign({}, this.state, {
            "isMenuOpen": !isMenuOpen
        }));
    }

    render() {
        const {
            filteredVenues,
            selectedVenue,
            selectedMarkerVenue
        } = this.state;
        return (
            <div>
                <GoogleApiComponent
                    venues={filteredVenues}
                    selectedVenue={selectedVenue}
                    onMarkerClicked={this.onMarkerClicked.bind(this)} />

                <Sidebar
                    venues={filteredVenues}
                    selectedMarkerVenue={selectedMarkerVenue}
                    onFilterInputChanged={this.onFilterInputChanged.bind(this)}
                    onLocationItemClicked={this.onLocationItemClicked.bind(this)} />
            </div>
        );
    }
}