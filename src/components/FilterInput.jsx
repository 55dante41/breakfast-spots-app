import React from "react";

export default class FilterInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        });
        this.props.onInputChanged(e.target.value);
    }

    render() {
        const { input } = this.state;
        const style = {
            "width": "99.5%",
            "height": "2em"
        };
        return (
            <section style={{ padding: "10px", "color": "white", "background": "black" }}>
                <h4>Filter your locations: </h4>
                <input
                    tabIndex="1"
                    style={style}
                    value={input}
                    placeholder="Find locations matching..."
                    onChange={(e) => { this.handleChange(e); }} />
            </section>
        );
    }
}