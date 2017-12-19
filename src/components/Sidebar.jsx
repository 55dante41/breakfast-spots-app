import React from "react";

import FilterInput from "./FilterInput";
import LocationsList from "./LocationsList";
import LocationDetails from "./LocationDetails";

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "selectedVenue": null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            selectedMarkerVenue,
            venues
        } = this.props;
        if (prevProps.selectedMarkerVenue !== selectedMarkerVenue || prevProps.venues !== venues) {
            venues.filter((item) => {
                if (item.id === selectedMarkerVenue) {
                    this.setState({
                        "selectedVenue": item
                    });
                    return;
                }
            });
        }
    }

    onLocationItemClicked(venue) {
        this.setState({
            "selectedVenue": venue
        });
        this.props.onLocationItemClicked(venue);
    }

    render() {
        const {
            selectedVenue
        } = this.state;
        const {
            venues,
            onFilterInputChanged
        } = this.props;
        const style = {
            "width": "50%",
            "height": "97vh",
            "display": "inline-block",
            "verticalAlign": "top"
        };
        return (
            <aside style={style}>
                <FilterInput
                    onInputChanged={onFilterInputChanged} />
                <LocationsList
                    venues={venues}
                    onLocationItemClicked={this.onLocationItemClicked.bind(this)} />
                <LocationDetails
                    selectedItem={selectedVenue} />
            </aside>
        );
    }
}