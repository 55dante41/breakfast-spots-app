import React from "react";

export default class LocationItem extends React.Component {
    render() {
        const {
            venue
        } = this.props;
        return (
            <li tabIndex="2" style={{ width: "100%", cursor: "pointer" }} onClick={this.handleClick.bind(this)}>
                <h5> {venue.name} ( <span> {venue.location.address} </span> ) </h5>
            </li>
        );
    }

    handleClick() {
        this.props.onLocationItemClicked(this.props.venue);
    }
}