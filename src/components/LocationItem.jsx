import React from "react";

export default class LocationItem extends React.Component {
    render() {
        const {
            venue
        } = this.props;
        return (
            <div tabIndex="2" style={{ width: "100%" }}>
                <a onClick={this.handleClick.bind(this)}>
                    <h4> {venue.name} ( <span> {venue.location.address} </span> ) </h4>
                </a>
            </div>
        );
    }

    handleClick() {
        this.props.onLocationItemClicked(this.props.venue);
    }
}