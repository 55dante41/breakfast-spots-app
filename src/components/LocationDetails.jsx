import React from "react";

export default class LocationDetails extends React.Component {
    render() {
        const {
            selectedItem
        } = this.props;
        const style = {
            "padding": "10px",
            "overflowY": "auto",
            "height": "30vh",
            "backgroundColor": "black",
            "color": "white"
        };

        if (!selectedItem) {
            return (
                <h3 style={style}>Please select a location to view the details here</h3>
            );
        }
        return (
            <details style={style} tabIndex="3" open>
                <h4> {selectedItem.name} </h4>
                <h5> {selectedItem.location.formattedAddress.join(", ")}</h5>
            </details>
        );
    }
}