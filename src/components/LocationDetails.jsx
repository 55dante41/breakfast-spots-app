import React from "react";

export default class LocationDetails extends React.Component {
    render() {
        const {
            selectedItem
        } = this.props;
        const style = {
            "padding": "10px",
            "overflowY": "auto"
        };

        if (!selectedItem) {
            return (
                <div style={style}>Please select a location to view the details</div>
            );
        }
        return (
            <div style={style}>
                <h4> {selectedItem.name} </h4>
                <h5> {selectedItem.location.formattedAddress.join(", ")}</h5>
            </div>
        );
    }
}