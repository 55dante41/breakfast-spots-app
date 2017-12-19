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
                <details style={style}>Please select a location to view the details</details>
            );
        }
        return (
            <details style={style}>
                <h4> {selectedItem.name} </h4>
                <h5> {selectedItem.location.formattedAddress.join(", ")}</h5>
            </details>
        );
    }
}